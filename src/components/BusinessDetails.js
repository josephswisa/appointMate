import {useLocation, useParams} from "react-router-dom";
import {
    Typography,
    Avatar,
    Grid,
    TextField,
    Button,
    Box,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState , useEffect} from "react";
import axios from "axios";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import {SelectChangeEvent} from "@mui/material";
import Cookies from "js-cookie";


export default function BusinessDetails() {
    const { username } = useParams();

    const getSingleBusinessEndPoint = 'http://localhost:4000/get-business-details'
    const getAppointmentTypes = 'http://localhost:4000/get-appointment-types'
    const getAppointmentsList = 'http://localhost:4000/show-business-appointments'
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [selectedAppointmentType,setSelectedAppointmentType] = useState({});
    const [blockedTimes, setBlockedTimes] = useState([]);
    const [blockedIntervals , setBlockedIntervals] = useState([])
        const [selectedDateTime, setSelectedDateTime] = useState(new Date());
        const [business , setBusiness] = useState({});
        const costumer = Cookies.get('username');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(getSingleBusinessEndPoint, { username });
                const data = response.data;
                setBusiness(data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchAppointmentTypesArray = async () => {
            try {
                const response = await axios.post(getAppointmentTypes, { username });
                const data = response.data;
                setAppointmentTypes(data.appointmentTypes);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchAppointmentsList = async () => {
            try {
                const response = await axios.post(getAppointmentsList, { username });
                const appointments = response.data;
                const appointmentDetails = await Promise.all(
                    appointments.map(async (app) => {
                        const date = new Date(app.date);
                        const time = date.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                        });
                        const duration = app.appointmentType.duration;

                        return { date, time, duration };
                    })
                );

                const resolvedAppointmentDetails = appointmentDetails.flat();
                const blockedTimes = calculateEndTime(resolvedAppointmentDetails);
                const intervals = generateIntervals(blockedTimes);

                setBlockedIntervals(intervals);
            } catch (error) {
                console.log(error);
            }
        };

        Promise.all([fetchAppointmentTypesArray(), fetchData(), fetchAppointmentsList()]).then(() => {
            console.log(blockedIntervals);
        });
        console.log(blockedIntervals)
    }, []);



    // useEffect(()=>{
    //     async function fetchData(){
    //         await axios.post(getSingleBusinessEndPoint , {username})
    //             .then( response => {
    //                 const data =  response.data
    //                 setBusiness(data);
    //             })
    //             .catch(error => {
    //                 //console.log(error);
    //             });
    //     }
    //     async function fetchAppointmentTypesArray(){
    //
    //         await axios.post(getAppointmentTypes,{username})
    //             .then( response => {
    //                 const data =  response.data
    //                // console.log(data.appointmentTypes);
    //                 setAppointmentTypes(data.appointmentTypes);
    //             })
    //             .catch(error => {
    //                 //console.log(error);
    //             });
    //     }
    //
    //     async function fetchAppointmentsList(){
    //         await axios.post(getAppointmentsList, {username})
    //             .then(async response => {
    //                 const appointments = response.data;
    //                 const appointmentDetails = await Promise.all(
    //                     appointments.map(async (app) => {
    //                         const date = new Date(app.date);
    //                         const time = date.toLocaleTimeString('en-US', {
    //                             hour: 'numeric',
    //                             minute: 'numeric',
    //                             hour12: false,
    //                         });
    //                         const duration = app.appointmentType.duration;
    //
    //                         return {date, time, duration};
    //                     })
    //                 );
    //
    //                 const resolvedAppointmentDetails = appointmentDetails.flat();
    //                 setBlockedTimes(calculateEndTime(resolvedAppointmentDetails));
    //                 const intervals = generateIntervals(blockedTimes)
    //                 console.log(intervals)
    //                 setBlockedIntervals(intervals)
    //                 console.log(blockedIntervals)
    //             })
    //             .catch(error =>{
    //                 //console.log(error)
    //             })
    //     }
    //
    //     fetchAppointmentTypesArray().then(r => console.log())
    //     fetchData().then(r => console.log())
    //     fetchAppointmentsList().then(r =>console.log(blockedTimes));
    //
    // },[])

    function calculateEndTime(data) {
        return data.map(item => {
            const startTime = new Date(item.date);
            const endTime = new Date(startTime.getTime() + item.duration * 60000); // Convert duration to milliseconds and add to start time

            return {
                date: startTime.toDateString(),
                time: item.time,
                endTime: endTime.toTimeString().split(' ')[0] // Extract the time part from the full string
            };
        });
    }

    function generateIntervals(data) {
        const intervals = [];

        data.forEach(item => {
            const startDate = new Date(`${item.date} ${item.time}`);
            const endDate = new Date(`${item.date} ${item.endTime}`);

            let currentTime = new Date(startDate);

            while (currentTime < endDate) {
                const intervalStart = new Date(currentTime);
                const intervalEnd = new Date(currentTime.getTime() + 10 * 60000);

                intervals.push({
                    date: item.date,
                    startTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    endTime: intervalEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });

                currentTime = intervalEnd;
            }
        });

        return intervals;
    }

    const handleDateChange = date => {
        setSelectedDateTime(date);
        console.log('Selected date:', date);
    };


    const handleTypeSelection = (event: SelectChangeEvent) => {
        setSelectedAppointmentType(event.target.value);
    };

        const handleBookAppointment = () => {
            console.log(selectedDateTime)
            console.log(selectedAppointmentType)
            const addAppointmentEndpoint = 'http://localhost:4000/add-appointment'
            const date = selectedDateTime;
            const appointmentType = selectedAppointmentType;
            const business = username;
            axios.post(addAppointmentEndpoint,{date , appointmentType , costumer , business})
                .then( response => {
                    window.location.href = '/manage';
                })
                .catch(error => {
                    console.log(error);
                });
        };

    const getBlockedTimesForDate = (date) => {
        const blockedTimes = blockedIntervals
            .filter(interval => interval.date === date.toDateString())
            .map(interval => new Date(`${interval.date} ${interval.startTime}`));

        return blockedTimes;
    };

        return (
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{marginTop: 1}}>
                <Grid item xs={12} sm={4} align="center">
                    <Avatar src={business.logo} sx={{width: 180, height: 180}}/>
                </Grid>
                <Grid align="center">
                    <Typography variant="h4">{business.name}</Typography>
                    <Typography variant="h5">{business.businessType}</Typography>
                    <Typography variant="h6">{business.address}</Typography>
                    {/*<LocalPhoneIcon /> Phone number*/}
                    {/*<Box>*/}
                    {/*<InstagramIcon/>*/}
                    {/*    <FacebookIcon/>*/}
                    {/*</Box>*/}
                    <Box mt={3}>
                        <Typography variant="h6">Book an Appointment</Typography>
                        <Box>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Appointment Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Appointment Type"
                                value={selectedAppointmentType}
                                onChange={handleTypeSelection}
                            >
                                {
                                    appointmentTypes.map((singleAppointmentType) =>(
                                        <MenuItem value={singleAppointmentType}>{singleAppointmentType.name}</MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
                        </Box>
                        <DatePicker
                            selected={selectedDateTime}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            onChange={handleDateChange}
                            showTimeSelect
                            timeIntervals={10}
                            timeCaption="Time"
                            minDate={new Date()}
                            minTime={new Date().setHours(9, 0)}
                            maxTime={new Date().setHours(17, 0)}
                            excludeTimes={selectedDateTime ? getBlockedTimesForDate(selectedDateTime) : []}
                        />
                        <Box mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBookAppointment}
                                disabled={!selectedDateTime}
                            >
                                Book
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        );

    }

