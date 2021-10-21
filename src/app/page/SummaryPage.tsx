import { Card, Col, DatePicker, Divider, Form, Row, Select, Space, Spin, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { getCasesForCountryByDateAsyncAsync, summaryList, summaryLoading } from '../../features/summary/summarySlice';
import { Moment } from 'moment';
import { countriesList, countriesLoading, getAllCountriesAsync } from '../../features/countries/countriesSlice';
import { CountryDto } from '../../service/dto/countryDto';
import { CaseInfoDto } from '../../service/dto/dayoneDto';
import './SummaryPage.css';
import moment from 'moment';

const { Option } = Select;
const DateFormat = "MM/DD/YYYY";
const colors = () => {
    const colorTags = ["magenta", "red", "volcano", "green", "cyan", "blue", "geekblue", "purple", "orange"];
    let random = Math.floor(Math.random() * colorTags.length);
    return colorTags[random];
}
const SummaryPage = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector(countriesList);
    const summarys = useAppSelector(summaryList);
    const countryLoad = useAppSelector(countriesLoading);
    const summaryLoad = useAppSelector(summaryLoading);

    const [data, setdata] = useState<CaseInfoDto | null>(null);
    useEffect(() => {
        dispatch(getAllCountriesAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [searchCountry, setSearchCountry] = useState<string>("");
    useEffect(() => {
        if (searchCountry) {
            dispatch(getCasesForCountryByDateAsyncAsync({ country: searchCountry, from: fromDate, to: toDate }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchCountry]);


    useEffect(() => {
        debugger
        const from = fromDate ? new Date(fromDate.getTime()) : null;
        if (fromDate && toDate && fromDate.getTime() === toDate.getTime()) {
            from?.setDate(from.getDate() + -1);
        }
        const dateFilters = summarys.filter((countryitem: CaseInfoDto) => {
            return (from == null ? true : new Date(countryitem.Date) >= from)
                &&
                (toDate == null ? true : new Date(countryitem.Date) <= toDate);
        }
        );
        if (!dateFilters || dateFilters.length === 0) {
            setdata(null);
            return
        }
        if (dateFilters.length === 1) {
            const first = dateFilters[0];
            setdata(first);
        } else {
            const first = dateFilters[0];
            const last = dateFilters[dateFilters.length - 1];
            const newValue: CaseInfoDto = {
                ...first,
                Confirmed: last.Confirmed - first.Confirmed,
                Deaths: last.Deaths - first.Deaths,
                Recovered: last.Recovered - first.Recovered,
            }
            setdata(newValue);
        }

    }, [summarys, fromDate, toDate])

    const handleChangeDateStart = (value: Moment | null) => {
        const date = value!?.toDate()
        date?.setHours(7, 0, 0, 0)
        setFromDate(date);
    }
    const handleChangeDateEnd = (value: Moment | null) => {
        const date = value!?.toDate()
        date?.setHours(7, 0, 0, 0)
        setToDate(date);
    }
    const handleChangeSelect = (value: string) => {
        setSearchCountry(value);
    }
    return (
        <>
            {!countryLoad ?
                (<>
                    <Row>
                        <Col span={24} style={{ textAlign: 'center' }}
                        >
                            <h2> Covid Table</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ span: 10, offset: 0 }}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a country"
                                optionFilterProp="children"
                                onChange={handleChangeSelect}
                                filterOption={(input: any, option: any) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {countries.map((item: CountryDto) => <Option key={item.Country} value={item.Slug}>{item.Country}</Option>)}
                            </Select>
                        </Col>
                    </Row>
                    <Divider style={{ backgroundColor: 'white', color: 'white', paddingBottom: 0, marginBottom: 0 }} />
                    <Row>
                        <Tooltip title={searchCountry === "" ? 'select country' : ""} placement='top'>
                            <Form>
                                <Space direction='horizontal'>
                                    <Form.Item name="startDate" label="From:" style={{ paddingRight: '10px' }}>
                                        <DatePicker
                                            name="startDate"
                                            disabled={searchCountry === "" ? true : false}
                                            onChange={handleChangeDateStart}
                                            format={DateFormat}
                                        />
                                    </Form.Item>
                                    <Form.Item name="endDate" label="To:" style={{ paddingRight: '10px', paddingLeft: '30px' }}>
                                        <DatePicker
                                            name="endDate"
                                            disabled={searchCountry === "" ? true : false}
                                            onChange={handleChangeDateEnd}
                                            format={DateFormat}
                                        />
                                    </Form.Item>
                                </Space>
                            </Form>
                        </Tooltip>
                    </Row>

                    <Divider style={{ backgroundColor: 'white', paddingBottom: 0, marginBottom: 0 }} />

                    <Row style={{ overflowX: 'auto', height: '1000px' }}>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 24, offset: 0 }}
                            lg={{ span: 24, offset: 0 }}
                            xl={{ span: 24, offset: 0 }}
                            xxl={{ span: 24, offset: 0 }}
                        >
                            <Card>
                                {summaryLoad ? (<div className="example">
                                    <Spin />
                                </div>) :
                                    data && (<>
                                        <h1>Total confirmed: <Tag style={{ fontSize: '20px' }} color={colors()}>{data?.Confirmed}</Tag></h1>
                                        <h1>Total Deaths: <Tag style={{ fontSize: '20px' }} color={colors()}>{data?.Deaths}</Tag></h1>
                                        <h1>Total Recovered: <Tag style={{ fontSize: '20px' }} color={colors()}>{data?.Recovered}</Tag></h1>
                                    </>)
                                }
                            </Card>
                        </Col>

                    </Row>
                </>) : <div className="example">
                    <Spin />
                </div>
            }
            {/* {!countryLoad &&
                <div className="example">
                    <Spin />
                </div>
            } */}
        </>
    );
}
export default SummaryPage;