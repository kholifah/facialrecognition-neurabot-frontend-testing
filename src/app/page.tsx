
'use client'

import { useState } from 'react'
import { TextField, Button, Paper, Box, Typography, InputAdornment, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Eye, EyeOff } from 'lucide-react'
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
  backgroundColor: '#e0e7ff',
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
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      router.push('/dashboard')
    }
  }

  return (
    <LoginContainer>
      <StyledPaper elevation={3} variant='outlined'>
        <IconWrapper className='bg-blue-600'>
          <Building2 color="white" size={32} />
        </IconWrapper>
        
        <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
          Attendance System
        </Typography>
        
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
          Facial Recognition Platform
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

          <Box className='mb-4'>
            <Typography variant="subtitle2" fontWeight='bold' className=" text-gray-700">
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              placeholder="Enter your password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            Sign In
          </Button>
          
          <Box textAlign="center">
            <Button 
              variant="text" 
              color="primary"
              sx={{ textTransform: 'none' }}
              href='/forgot-password'
            >
              Forgot Password?
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </LoginContainer>
  )
}