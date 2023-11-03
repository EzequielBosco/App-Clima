import { Container, Box, Typography } from '@mui/material'

function Navbar() {

return (
  <Box sx={{ position: "sticky", top: "0", right: "0", left: "0", paddingTop: "4px", zIndex: 2 }} component="nav">
    <Container sx={{ display: "flex" }}>
      <a href='/'><Box component="img" alt="app clima" width="50px" src="/icon.png" sx={{ textAlign: "center" }}/></a>
      <Typography align='center' sx={{mt: "12px", color: "black", fontSize: "15px"}} gutterBottom>
        Clima View
      </Typography>
    </Container>
  </Box>
)}

export default Navbar