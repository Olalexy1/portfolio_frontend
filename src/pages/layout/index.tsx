import NavBar from '@/components/NavBar';
import { Box } from '@mui/system';
import { Footer } from '@/container';

const Layout = ({ children }: any) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                padding: '0px',
            }}
        >
            {/* <NavBar /> */}
            {children}
        </Box>
    )
}

export default Layout;