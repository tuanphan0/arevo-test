import { Card, Col, DatePicker, Divider, Form, Input, Row, Select, Skeleton, Space, Spin, Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getDayOneAsync, summaryList, summaryLoading } from './summarySlice';
import { Moment } from 'moment';
import { countriesList, countriesLoading, getAllCountriesAsync } from '../countries/countriesSlice';
import { CountryDto } from '../../service/dto/countryDto';
import { DayoneDto } from '../../service/dto/dayoneDto';
import './Summary.less';

const { Option } = Select;
const DateFormat = "MM/DD/YYYY";
const colors=()=>{
    const colorTags = ["magenta", "red", "volcano", "green", "cyan", "blue", "geekblue","purple","orange"];
    let random = Math.floor(Math.random() * colorTags.length);
    return colorTags[random];
}
const Summary = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector(countriesList);
    const summarys = useAppSelector(summaryList);
    const countryLoad = useAppSelector(countriesLoading);
    const summaryLoad = useAppSelector(summaryLoading);
    useEffect(() => {
        dispatch(getAllCountriesAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchCountry, setSearchCountry] = useState<string>("");
    useEffect(() => {
        if (searchCountry !== "") {
            dispatch(getDayOneAsync(searchCountry));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchCountry]);
    const dateFilters = summarys.filter((countryitem: DayoneDto) => {
        return !searchCountry ? true : countryitem.Country?.toLowerCase().includes(searchCountry?.toLowerCase())
            &&
            (startDate == null ? true : new Date(countryitem.Date) >= startDate)
            &&
            (endDate == null ? true : new Date(countryitem.Date) <= endDate);
    }
    );
    const handleTotal = (value: string) => {
        switch (value) {
            case "Confirmed":
                {
                    if (startDate == null && endDate === null) {
                        return summarys?.filter((x: DayoneDto) => x.Confirmed).length;
                    }
                    else {
                        return dateFilters?.filter((x: DayoneDto) => x.Confirmed).length;
                    }
                } break;
            case "Deaths":

                {
                    if (startDate == null && endDate === null) {
                        return summarys?.filter((x: DayoneDto) => x.Deaths).length;
                    }
                    else {
                        return dateFilters?.filter((x: DayoneDto) => x.Deaths).length;
                    }
                } break;
            case "Recovered":

                {
                    if (startDate == null && endDate === null) {
                        return summarys?.filter((x: DayoneDto) => x.Recovered).length;
                    }
                    else {
                        return dateFilters?.filter((x: DayoneDto) => x.Recovered).length;
                    }
                } break;

            default:
                break;
        }
    }
    const handleChangeDateStart = (value: Moment | null) => {
        setStartDate(value!?.toDate());
    }
    const handleChangeDateEnd = (value: Moment | null) => {
        setEndDate(value!?.toDate());
    }
    const handleChangeSelect = (value: string) => {
        setSearchCountry(value);
    }
    return (
        <>
            {countryLoad &&
                <>
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
                                {countries.map((item: CountryDto) => {
                                    return (
                                        <>
                                            <Option key={item.Country} value={item.Country}>{item.Country}</Option>
                                        </>
                                    );
                                })}
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
                                {summaryLoad &&
                                    <>
                                        <h1>Total confirmed: <Tag style={{fontSize:'20px'}} color={colors()}>{handleTotal("Confirmed")}</Tag></h1>
                                        <h1>Total Deaths: <Tag style={{fontSize:'20px'}} color={colors()}>{handleTotal("Deaths")}</Tag></h1>
                                        <h1>Total Recovered: <Tag style={{fontSize:'20px'}} color={colors()}>{handleTotal("Recovered")}</Tag></h1>
                                    </>
                                } {!summaryLoad &&
                                    <>
                                        <Skeleton />
                                    </>
                                }
                            </Card>
                        </Col>

                    </Row>
                </>
            }
            {!countryLoad &&
                <>
                    <div className="example">
                        <Spin />
                    </div>
                </>
            }
        </>
    );
}
export default Summary;