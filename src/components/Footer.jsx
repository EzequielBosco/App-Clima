import { Container, Box, Typography } from '@mui/material'

function Footer() {

return (
  <Box sx={{ padding: "14px" }} component="footer">
    <Typography align='center' sx={{ pt: "5px", fontSize: "14px" }} gutterBottom>
      Sitio web desarrollado por <a href='https://ezequielbosco.vercel.app/' target='_blank'>Ezequiel Bosco </a>
    </Typography>
  </Box>
)}

export default Footer