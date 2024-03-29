/**Author : Charmarine LO
 * Purpose Monthly Campaign Tracker to track and project current and future monthly spending
 * Date : 10th March, 2024
 */
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    Autocomplete,
    Button,
    TextField, Table, TableHead, TableBody, TableRow, TableCell,Alert,LinearProgress 
   } from "@mui/material";

const SpendingTracker = () => {
   
    const [budgetPrice, setBudgetPrice] = useState(-1);
    const [actualPrice, setActualPrice] = useState(-1);
    const [isErrorActualPriceInput, setErrorActualPriceInput]= useState(true);
    const [isErrorBudgetPriceInput, setErrorBudgetPriceInput]= useState(true);
    const [month, setMonth] = useState(""); 
    const [listItem, setListItem]= useState([]);
    const [actualSpendingTotal, setActualSpendingTotal]= useState(0);
    const [budgetSpendingTotal, setBudgetSpendingTotal]= useState(0);
   
    const [forecastTotal, setforecastTotal]= useState(0);
    const [remainingMonth, setRemainingMonth]= useState(0);
    const [actualSpendList, setActualSpendList]= useState([]);
    const [isShownPrediction, setIsShownPrediction]= useState(false);
    const [isAutocompleteDisabled, setIsAutocompleteDisabled] = useState(false);
    useEffect(() => {
        document.title = "Monthly Campaign Tracker by Charmarine Lo"
     }, []);
    useEffect(() => {
        if (listItem.length == 12) {
            setIsAutocompleteDisabled(true);
            
            calProjectTotalCost ();
            setIsShownPrediction(true);

        } else {
            setIsAutocompleteDisabled(false);
            return;
        }
    }, [listItem]);


   
    const handleBudgetPrice = (e) =>{

       

        if (/^-?\d*(\.\d*)?$/.test(e.target.value)) {           
            setBudgetPrice(parseFloat(e.target.value));
            setErrorBudgetPriceInput(true )  ;
        } else  {    
            setErrorBudgetPriceInput(false)   ; 
            return;            
        }

        
    }
    const handleActualPrice = (e) =>{
        if (/^-?\d*(\.\d*)?$/.test(e.target.value)) {           
            setActualPrice(parseFloat(e.target.value));
            setErrorActualPriceInput(true)  ;
        } else  {    
            setErrorActualPriceInput(false)   ;             
        }          
    }
    const onSaveClicked =()=>{

      
        setListItem([...listItem, 
            { 
             budgetPrice: budgetPrice, 
             actualPrice: actualPrice,
             month:month}]);
       
    
        setBudgetPrice(-1);
        setActualPrice(-1);
        setMonth("");
    }
    const onSubmitClicked = ()=>{
       
     

        calProjectTotalCost  ();
        setIsShownPrediction(true);
    }
    

    const calProjectTotalCost = () => {   


       //filter out any list that not include actualPrice = 0, find the length
        const yearToMonthActual = listItem.filter(item => item.actualPrice !== -1);  
        setActualSpendList(yearToMonthActual);
        let yearToMonthActualTotal = yearToMonthActual.reduce((total,expense)=>total+expense.actualPrice, 0);
 
        setActualSpendingTotal(yearToMonthActualTotal);

        //BudgetTotal
        let BudgetTotal = listItem.reduce((total,expense)=>total+expense.budgetPrice, 0);
        setBudgetSpendingTotal(BudgetTotal);
 
    
        //Remaining that could spend
        let forecastRemainingTotal =  BudgetTotal - yearToMonthActualTotal ;
       
        setforecastTotal(forecastRemainingTotal);      
        setRemainingMonth(listItem.length - yearToMonthActualTotal.length);    
       
    }
    const onMonthChange= (event, selectedOption)=>{
       
        setMonth(selectedOption.month);
       
    }
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      
    return (
       
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , background: 'linear-gradient(to right, #ff7e5f, #feb47b)', minHeight:'1000px'}}>
      
        <Card style={{ width: '80%' ,marginTop:'2%',marginBottom:'5%'}}>
           {isShownPrediction && 
           <Alert 
            variant="filled" 
            severity="warning"
            sx={{ 
                backgroundColor: 'grey',
                color: '#fff',
               
              }}
            >
               
                The Total Spending is ${actualSpendingTotal}.<br/>
                The Remaining Spending is  ${forecastTotal}.<br/>  
                <LinearProgress variant="determinate" 
                value={(actualSpendingTotal > budgetSpendingTotal )? 100:actualSpendingTotal/budgetSpendingTotal *100} 
                sx={{ marginTop: '2%',  marginBottom: '2%', height: 20 }} />               
                 Forecasted average monthly spending is ${forecastTotal / (12 - actualSpendList.length)}
                
            </Alert>}           
 
           <CardHeader title="Monthly Campaign Tracker"  
           titleTypographyProps={{variant:'h3' }}
           style={{ margin: '2%', textAlign:'center' , fontWeight:'bold',
           background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent'}} />  
          
            <CardContent  >
                   <Typography variant="body2" style={{ textAlign:'center' , fontWeight:'bold'}} >
                   Predict your budget by calculating how much remaining in the coming months.<br/>
                   Input your Month, Budget and Actual Cost and <span style={{ color: '#ff7e5f' }}> Save</span> First.<br/>
                   Forecast ready when it press <span style={{ color: '#ff7e5f' }}>Forecast</span>  or when input all 12 months data.<br/>
                   </Typography>                
            </CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '2%' }}>        
 
                    <TextField 
                    required
                    error={!isErrorBudgetPriceInput}
                    helperText={!isErrorBudgetPriceInput ? "Incorrect entry." : ""}
                    id="Budget"
                    label="Budget$"
                    defaultValue="0"
                    onChange = {handleBudgetPrice}   
                    style={{ flex: '1',  margin: '2%' }} 
                    />

                    <TextField
                    required
                    error={!isErrorActualPriceInput}
                    helperText={!isErrorActualPriceInput ? "Incorrect entry." : ""}
                    id="Actual"
                    label="Actual$(-1 if Actual not known)"
                    defaultValue="0"
                    onChange = {handleActualPrice }   
                    style={{ flex: '1',  margin: '2%' }} 
                    />
                    <Autocomplete
                                        id="month"           
                                        options={months.map((obj, index)=>({month: obj, index: index})) }
                                        getOptionLabel={(option) => option.month }
                                        style={{ width: 300 ,  margin: '2%'}}
                                        onChange={onMonthChange}
                                        disabled={isAutocompleteDisabled}
                                        renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Months"
                                        variant="outlined"
                                        fullWidth                    
                                    />
                    )}/>
                    
            </div>

          

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'2%',marginBottom:'2%' }}>
                <CardActions>               
                    <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#ff7e5f', color: 'white' }} 
                    onClick={onSaveClicked}
                    > Save
                    </Button>
                    <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#feb47b', color: 'white' }} 
                    onClick={ onSubmitClicked }
                    > Forecast
                    </Button>
                </CardActions> 
            </div>
            
            {
                (listItem.length > 0) && 
                <Table>
                    <TableHead>
                    <TableRow
                    hover>
                                
                                    <TableCell>Budget $</TableCell>
                                    <TableCell>Actual $</TableCell>
                                    <TableCell>Month</TableCell>
                                </TableRow>
                    </TableHead>
                    <TableBody>
                    {listItem.map((item, index) => (
                        <TableRow key={index}>
                            
                            <TableCell>{item.budgetPrice}</TableCell>
                            <TableCell>{item.actualPrice}</TableCell>
                            <TableCell>{item.month}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>

            }
            
       </Card> 
      </div>
          
    
       
           
       
      
      
        
      
        

       

    );
};

export default SpendingTracker;