import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar,
} from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import {
  Grid,
  Eye,
  Pencil,
  Speedometer2,
  SignNoParking,
 
} from "react-bootstrap-icons";
import '../css/responsive.css'
import { useNavigate } from 'react-router-dom';

  export default function DashboardSidebar() {
    const navigate = useNavigate();
    const { broken, toggleSidebar } = useProSidebar();
    const handleClickDashboard=()=>{
      navigate('/dashboard')
    }
    const handleClickAddBuilding=()=>{
      navigate('/building')
    }
    const handleClickViewBuilding=()=>{
      navigate('/buildingsDetails')
    }
    const handleClickParkingPermit=()=>{
      navigate('/parkingReservations')
    }
    return (
      <>
           {broken && (
        <Button
          style={{
            backgroundColor: "hsl(218, 41%, 15%)",
            borderColor: "#83ca9c",
            margin: 5,
          }}
          onClick={() => toggleSidebar()}
        >
          <Grid />
        </Button>
      )}
          <Sidebar  breakPoint={"md"}  backgroundColor={" hsl(218, 41%, 15%)"} id="sideBar" style={{height:"100vh",width:"30px"}}>
            <Menu closeOnClick={true} style={{ marginTop: 50,}}>
            <MenuItem  id="style"  style={{color:'white'}} onClick={handleClickDashboard}> <Speedometer2 style={{marginRight:"12px"}}/> Dashboard </MenuItem>
              <MenuItem style={{color:'white'}}  onClick={handleClickAddBuilding}><Pencil style={{marginRight:"12px"}}/>Add Building </MenuItem>
              <MenuItem style={{color:'white'}} onClick={handleClickViewBuilding}> <Eye style={{marginRight:"12px"}}/>View Building </MenuItem>
              <MenuItem style={{color:'white'}} onClick={handleClickParkingPermit} ><SignNoParking style={{marginRight:"12px"}}/>Parking permit </MenuItem>
              <MenuItem style={{color:'white'}}><Pencil style={{marginRight:"12px"}}/> Add Reports </MenuItem>

            </Menu>
          </Sidebar>
      </>
    )
  }