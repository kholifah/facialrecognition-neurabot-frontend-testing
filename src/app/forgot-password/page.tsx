
'use client'

import { useState } from 'react'
import { TextField, Button, Paper, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { 
  Building2,
} from 'lucide-react'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 420,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

const LoginContainer = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f3f4f6',
  padding: '1rem',
})

const IconWrapper = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}))

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      router.push('/dashboard')
    }
  }

  return (
    <LoginContainer>
      <StyledPaper elevation={3}>
        <IconWrapper>
          <Building2 color="white" size={32} />
        </IconWrapper>
        
        <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
          Forgot Password
        </Typography>
        
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
          Enter your registered email of your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Box className='mb-4'>
            <Typography variant="subtitle2" fontWeight='bold' className=" text-gray-700">
              Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="your@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'medium'
            }}
          >
            Send Reset Instructions
          </Button>
          
          <Box textAlign="center">
            <Button 
              variant="text" 
              color="primary"
              sx={{ textTransform: 'none' }}
              href='/'
            >
              Login
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </LoginContainer>
  )
}