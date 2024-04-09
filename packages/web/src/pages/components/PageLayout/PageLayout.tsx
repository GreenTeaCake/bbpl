import { useCallback, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';

export const PageLayout: FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = useCallback(() => {
    navigate('/posts');
  }, [navigate]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton onClick={handleHomeClick}>
            <HomeIcon
              sx={{
                color: '#ffffff',
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container
        maxWidth="lg"
        sx={{
          padding: '16px 8px',
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};
