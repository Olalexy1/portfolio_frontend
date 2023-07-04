import NavBar from '@/components/NavBar';
import { Box } from '@mui/system';

const Layout = ({ children }: any) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                border: '1px solid red'
            }}
        >
            <NavBar />
            {children}
        </Box>
    )
}

export default Layout;