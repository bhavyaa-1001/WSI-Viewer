import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Grid, 
  Typography, 
  Button,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  Tooltip,
  Zoom,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ScienceIcon from '@mui/icons-material/Science';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';

// Add print styles
const PrintableContent = styled('div')(({ theme }) => ({
  '@media print': {
    '& .MuiDialog-root': {
      position: 'absolute',
      height: 'auto',
      overflow: 'visible'
    },
    '& .MuiDialogContent-root': {
      overflow: 'visible'
    },
    '& .MuiPaper-root': {
      boxShadow: 'none'
    },
    '& .no-print': {
      display: 'none !important'
    }
  }
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

// Update Paper component styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #1a237e, transparent)',
    animation: `${glowAnimation} 3s infinite`
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
  }
}));

// Add loading animation component
const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  '& .loading-circle': {
    width: '50px',
    height: '50px',
    border: '3px solid transparent',
    borderTop: `3px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  }
}));

function App() {
  const transformComponentRef = useRef(null);
  const [detectionResults, setDetectionResults] = useState([]);

  const [wsiData, setWsiData] = useState({
    RBC: [],
    WBC: [],
    Platelets: { count: 0, percentage: "0%" }
  });

  const [magnification, setMagnification] = useState(1);
  const [showOverlay, setShowOverlay] = useState(true);
  const [scale, setScale] = useState(1);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [openReport, setOpenReport] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBoxAnimation, setSelectedBoxAnimation] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({
    cellClassification: {
      normal: 0,
      abnormal: 0,
      confidence: 0
    },
    anomalyDetection: {
      anomalies: [],
      severity: 'low'
    },
    cellCounting: {
      total: 0,
      byType: {}
    },
    imageAnalysis: {
      quality: 'high',
      artifacts: [],
      recommendations: []
    }
  });
  const [showAiPanel, setShowAiPanel] = useState(false);

  // Add patient data state
  const [patientData] = useState({
    patient_id: "P12345",
    date: new Date().toLocaleDateString()
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1a237e',
      },
      secondary: {
        main: '#0066FF',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const getColorForCellType = (cellType) => {
    return '#0066FF';  // सभी सेल्स के लिए नीला कलर
  };

  const renderDetectionBoxes = () => {
    if (!showOverlay || !detectionResults.length) return null;
    
    return (
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        transformOrigin: '0 0',
        transform: `scale(${1/scale})`
      }}>
        {detectionResults.map((result, index) => {
      const [x1, y1, x2, y2, cellType] = result;
          const isHovered = hoveredCell === index;
          const isSelected = selectedCell === index;
          const color = getColorForCellType(cellType);
          
          return (
            <div key={index}>
              <div 
                style={{
        position: 'absolute',
        left: `${x1}px`,
        top: `${y1}px`,
        width: `${x2 - x1}px`,
        height: `${y2 - y1}px`,
                  border: `2px solid ${color}`,
                  backgroundColor: isHovered || isSelected ? `${color}22` : 'transparent',
                  transition: 'all 0.2s ease-in-out',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  zIndex: isHovered || isSelected ? 2 : 1,
                  borderRadius: '2px'
                }}
                onMouseEnter={() => setHoveredCell(index)}
                onMouseLeave={() => setHoveredCell(null)}
                onClick={() => setSelectedCell(index === selectedCell ? null : index)}
              />
              {(showLabels && (isHovered || isSelected || scale > 2)) && (
                <div
                  style={{
                    position: 'absolute',
                    top: `${y2 + 2}px`,
                    left: `${x1}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    whiteSpace: 'nowrap',
                    zIndex: 3,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  {cellType.replace('_', ' ')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const HubView = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hubImageRef = useRef(null);

    const handleHubClick = (event) => {
      if (event.target === hubImageRef.current && transformComponentRef.current) {
        event.stopPropagation();
        
        const rect = hubImageRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const mainContainer = transformComponentRef.current.instance.wrapperComponent;
        const mainImage = transformComponentRef.current.instance.contentComponent;
        
        if (!mainContainer || !mainImage) return;

        const containerWidth = mainContainer.clientWidth;
        const containerHeight = mainContainer.clientHeight;
        const imageWidth = mainImage.clientWidth;
        const imageHeight = mainImage.clientHeight;

        const targetX = -(x * imageWidth - containerWidth / 2);
        const targetY = -(y * imageHeight - containerHeight / 2);

        transformComponentRef.current.setTransform(
          targetX,
          targetY,
          3
        );
        setMagnification(3);
        setScale(3);
      }
    };

    return (
      <Paper 
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          width: '200px',
          height: '150px',
          zIndex: 3,
          overflow: 'hidden',
          border: '2px solid #ccc',
          backgroundColor: 'white',
          '&:hover': {
            boxShadow: 3
          }
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            ref={hubImageRef}
            src="/WhatsApp Image 2025-03-18 at 14.23.11_c9df4a0c.jpg"
            alt="Hub View"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'crosshair',
              imageRendering: 'pixelated'
            }}
            onClick={handleHubClick}
          />
          <div style={{
            position: 'absolute',
            border: '2px solid red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            left: `${50 - (viewportPosition.x || 0) * 100}%`,
            top: `${50 - (viewportPosition.y || 0) * 100}%`,
            width: `${Math.min(100, (1 / (scale || 1)) * 100)}%`,
            height: `${Math.min(100, (1 / (scale || 1)) * 100)}%`,
            transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
          }} />
        </div>
      </Paper>
    );
  };

  const generateReport = () => {
    const totalRBC = wsiData.RBC.reduce((acc, curr) => acc + curr.count, 0);
    const totalWBC = wsiData.WBC.reduce((acc, curr) => acc + curr.count, 0);

  return (
      <Dialog
        open={openReport}
        onClose={() => setOpenReport(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            '@media print': {
              margin: 0,
              width: '100%',
              height: 'auto',
              overflow: 'visible'
            }
          }
        }}
      >
        <PrintableContent>
          <DialogTitle sx={{ 
            bgcolor: '#1a237e', 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '@media print': {
              backgroundColor: '#1a237e !important',
              color: 'white !important',
              '-webkit-print-color-adjust': 'exact'
            }
          }}>
            <Typography variant="h6">Blood Smear Analysis Report</Typography>
            <Typography variant="subtitle2">
          {new Date().toLocaleString()}
        </Typography>
          </DialogTitle>
          
          <DialogContent sx={{ 
            '@media print': { 
              overflow: 'visible',
              height: 'auto'
            }
          }}>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Patient Information</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 500 }}>Patient ID</TableCell>
                      <TableCell>{patientData.patient_id}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>Date</TableCell>
                      <TableCell>{patientData.date}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
      </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Red Blood Cells (RBC) Analysis</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Count</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
              {wsiData.RBC.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.count}</TableCell>
                        <TableCell align="right">{item.percentage}</TableCell>
                        <TableCell>
                          {item.name === "Normal RBCs" && item.count > 200 ? "Normal" : 
                           item.name === "Normal RBCs" && item.count <= 200 ? "Low" : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 500 }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>{totalRBC}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>100%</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
                </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" gutterBottom>White Blood Cells (WBC) Analysis</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Count</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                      <TableCell>Reference Range</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wsiData.WBC.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.count}</TableCell>
                        <TableCell align="right">{item.percentage}</TableCell>
                        <TableCell>4,500-11,000/μL</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 500 }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>{totalWBC}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>100%</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Platelets Analysis</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell>Measurement</TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell>Reference Range</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Count</TableCell>
                      <TableCell align="right">{wsiData.Platelets.count}</TableCell>
                      <TableCell>150,000-450,000/μL</TableCell>
                      <TableCell>
                        {wsiData.Platelets.count >= 150 && wsiData.Platelets.count <= 450 
                          ? "Normal" 
                          : wsiData.Platelets.count < 150 
                            ? "Low" 
                            : "High"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Percentage</TableCell>
                      <TableCell align="right">{wsiData.Platelets.percentage}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Analysis Summary</Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" paragraph>
                  The blood smear analysis shows:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {wsiData.RBC.find(r => r.name === "Normal RBCs")?.count <= 200 && (
                    <li>
                      <Typography variant="body2" color="error">
                        Low RBC count indicating possible anemia
                      </Typography>
                    </li>
                  )}
                  {wsiData.RBC.find(r => r.name === "Abnormal RBCs")?.count > 0 && (
                    <li>
                      <Typography variant="body2" color="warning.main">
                        Presence of abnormal RBCs: {wsiData.RBC.find(r => r.name === "Abnormal RBCs")?.count} cells
                      </Typography>
                    </li>
                  )}
                  {wsiData.Platelets.count < 150 && (
                    <li>
                      <Typography variant="body2" color="error">
                        Low platelet count indicating possible thrombocytopenia
                  </Typography>
                    </li>
                  )}
                  {wsiData.Platelets.count > 450 && (
                    <li>
                      <Typography variant="body2" color="error">
                        High platelet count indicating possible thrombocytosis
                  </Typography>
                    </li>
                  )}
                </ul>
              </Paper>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Microscopic Image</Typography>
              <Paper variant="outlined" sx={{ 
                p: 2,
                '@media print': {
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid'
                }
              }}>
                <Box sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  '@media print': {
                    height: '500px'
                  }
                }}>
                  <img
                    src="/WhatsApp Image 2025-03-18 at 14.23.11_c9df4a0c.jpg"
                    alt="Blood Smear"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                  {showOverlay && (
                    <div style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none'
                    }}>
                      {renderDetectionBoxes()}
                    </div>
                  )}
                </Box>
              </Paper>
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ 
            p: 3,
            '@media print': {
              display: 'none'
            }
          }}>
            <Button 
              onClick={() => {
                setShowOverlay(true);
                setTimeout(() => {
                  window.print();
                }, 100);
              }}
              variant="outlined"
              startIcon={<SaveAltIcon />}
            >
              Print Report
            </Button>
            <Button 
              onClick={() => setOpenReport(false)}
              variant="contained"
              className="no-print"
            >
              Close
            </Button>
          </DialogActions>
        </PrintableContent>
      </Dialog>
    );
  };

  // AI Analysis Functions
  const analyzeImage = () => {
    setAiAnalysis({
      cellClassification: {
        normal: 85,
        abnormal: 15,
        confidence: 0.95
      },
      anomalyDetection: {
        anomalies: [
          { type: 'Abnormal RBC Shape', location: [200, 200], severity: 'medium', confidence: 0.85 },
          { type: 'WBC Clustering', location: [400, 300], severity: 'low', confidence: 0.78 }
        ],
        severity: 'medium'
      },
      cellCounting: {
        total: 150,
        byType: {
          'Normal RBC': 100,
          'Abnormal RBC': 20,
          'WBC': 25,
          'Platelet': 5
        }
      },
      imageAnalysis: {
        quality: 'high',
        artifacts: ['Minor blur in top-right corner'],
        recommendations: [
          'Consider additional staining for better contrast',
          'Check for potential sample preparation issues'
        ]
      }
    });
    setShowAiPanel(true);
  };

  const AiAnalysisPanel = () => (
    <Paper
      sx={{
        position: 'absolute',
        right: 16,
        top: 180,
        width: 300,
        p: 2,
        zIndex: 3,
        backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: theme => theme.palette.mode === 'dark' ? '0 2px 8px rgba(255,255,255,0.15)' : '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">AI Analysis</Typography>
        <IconButton size="small" onClick={() => setShowAiPanel(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Cell Classification
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Normal Cells</Typography>
          <Typography variant="body2">{aiAnalysis.cellClassification.normal}%</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">Abnormal Cells</Typography>
          <Typography variant="body2">{aiAnalysis.cellClassification.abnormal}%</Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Anomaly Detection
        </Typography>
        {aiAnalysis.anomalyDetection.anomalies.map((anomaly, index) => (
          <Typography key={index} variant="body2" color="warning.main">
            {anomaly.type} ({anomaly.confidence * 100}% confidence)
          </Typography>
        ))}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Cell Count
        </Typography>
        {Object.entries(aiAnalysis.cellCounting.byType).map(([type, count]) => (
          <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">{type}</Typography>
            <Typography variant="body2">{count}</Typography>
          </Box>
        ))}
      </Box>

      <Box>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Image Analysis
        </Typography>
        <Typography variant="body2" gutterBottom>
          Quality: {aiAnalysis.imageAnalysis.quality}
        </Typography>
        <Typography variant="body2" color="warning.main" gutterBottom>
          Artifacts:
        </Typography>
        <List dense>
          {aiAnalysis.imageAnalysis.artifacts.map((artifact, index) => (
            <ListItem key={index}>
              <ListItemText primary={artifact} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" color="info.main" gutterBottom>
          Recommendations:
        </Typography>
        <List dense>
          {aiAnalysis.imageAnalysis.recommendations.map((rec, index) => (
            <ListItem key={index}>
              <ListItemText primary={rec} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.default'
      }}>
        <AppBar 
          position="static" 
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WSI Viewer
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 2 }}>
              Patient ID: {patientData.patient_id} | {patientData.date}
            </Typography>
            <Tooltip title="AI Analysis">
              <IconButton 
                onClick={analyzeImage}
                sx={{ mr: 1 }}
              >
                <AutoAwesomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <MaterialUISwitch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper 
                sx={{ 
                  p: 2, 
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[8]
                  }
                }} 
                elevation={3}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#666' }}>
                    Mon Dec 09 2024 16:39:07
                  </Typography>
                  <IconButton size="small">
                    <ArrowBackIcon />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                    RBC
                  </Typography>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 60px 60px',
                    gap: 1,
                    '& > div': {
                      p: 1,
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Type</Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Count</Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Percentage</Typography>

                    <Typography variant="body2">Normal RBCs</Typography>
                    <Typography variant="body2">222</Typography>
                    <Typography variant="body2">67%</Typography>

                    <Typography variant="body2">Abnormal/Distorted</Typography>
                    <Typography variant="body2">50</Typography>
                    <Typography variant="body2">20%</Typography>

                    <Typography variant="body2">Burr Cells</Typography>
                    <Typography variant="body2">81</Typography>
                    <Typography variant="body2">33%</Typography>

                    <Typography variant="body2">Fragmented Cells</Typography>
                    <Typography variant="body2">2</Typography>
                    <Typography variant="body2">0.12%</Typography>

                    <Typography variant="body2">Overlapped</Typography>
                    <Typography variant="body2">-</Typography>
                    <Typography variant="body2">-</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                    WBC
                </Typography>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 60px 60px',
                    gap: 1,
                    '& > div': {
                      p: 1,
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}>
                    <Typography variant="body2">Basophil</Typography>
                    <Typography variant="body2">222</Typography>
                    <Typography variant="body2">67%</Typography>

                    <Typography variant="body2">Eosinophil</Typography>
                    <Typography variant="body2">50</Typography>
                    <Typography variant="body2">20%</Typography>

                    <Typography variant="body2">Lymphocyte</Typography>
                    <Typography variant="body2">87</Typography>
                    <Typography variant="body2">34%</Typography>

                    <Typography variant="body2">Monocyte</Typography>
                    <Typography variant="body2">2</Typography>
                    <Typography variant="body2">0.12%</Typography>
                  </Box>
            </Box>

                <Box>
                  <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                    Platelets
                  </Typography>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 60px',
                    gap: 1,
                    '& > div': {
                      p: 1,
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}>
                <Typography variant="body2">Count</Typography>
                    <Typography variant="body2">222</Typography>

                <Typography variant="body2">Percentage</Typography>
                    <Typography variant="body2">222</Typography>
                  </Box>
              </Box>

                <Box sx={{ mt: 4 }}>
                  <Button 
                    variant="contained"
                    fullWidth
                    onClick={() => setOpenReport(true)}
                    sx={{ 
                      mb: 2,
                      backgroundColor: '#1a237e',
                      '&:hover': {
                        backgroundColor: '#0d47a1'
                      }
                    }}
                  >
                    Report
                  </Button>
            </Box>
          </Paper>
        </Grid>

              <Grid item xs={12} md={9}>
                <Paper 
                  sx={{ 
                    height: 'calc(100vh - 140px)', 
                    position: 'relative',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[8]
                    }
                  }} 
                  elevation={3}
                >
                  <HubView />
                  
              <TransformWrapper
                    ref={transformComponentRef}
                initialScale={1}
                    minScale={0.1}
                    maxScale={2000}
                    onZoom={(ref) => {
                      const newScale = ref.state.scale;
                      setScale(newScale);
                      setMagnification(newScale);
                      if (newScale <= 1) {
                        setSelectedCell(null);
                      }
                    }}
                    onPanning={(ref) => {
                      const { positionX, positionY, scale } = ref.state;
                      const containerWidth = ref.instance.wrapperComponent.clientWidth;
                      const containerHeight = ref.instance.wrapperComponent.clientHeight;
                      const imageWidth = ref.instance.contentComponent.clientWidth;
                      const imageHeight = ref.instance.contentComponent.clientHeight;
                      
                      const maxX = (imageWidth * scale - containerWidth) / 2;
                      const maxY = (imageHeight * scale - containerHeight) / 2;
                      
                      const normalizedX = maxX !== 0 ? (positionX / maxX) : 0;
                      const normalizedY = maxY !== 0 ? (positionY / maxY) : 0;
                      
                      setViewportPosition({
                        x: normalizedX,
                        y: normalizedY
                      });
                    }}
                    smooth={true}
                    wheel={{ step: 0.1 }}
                    centerOnInit={true}
                    limitToBounds={true}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                        <Box sx={{ 
                          position: 'absolute', 
                          left: 16, 
                          top: 90,
                          zIndex: 2,
                          backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                          padding: 2,
                          borderRadius: 2,
                          boxShadow: theme => theme.palette.mode === 'dark' ? '0 2px 8px rgba(255,255,255,0.15)' : '0 2px 8px rgba(0,0,0,0.15)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1
                        }}>
                          <IconButton 
                            onClick={() => {
                              zoomIn(0.1);
                              const newScale = Math.min(scale + 0.1, 2000);
                              setScale(newScale);
                              setMagnification(newScale);
                              if (transformComponentRef.current) {
                                const { positionX, positionY } = transformComponentRef.current.state;
                                const containerWidth = transformComponentRef.current.instance.wrapperComponent.clientWidth;
                                const containerHeight = transformComponentRef.current.instance.wrapperComponent.clientHeight;
                                const imageWidth = transformComponentRef.current.instance.contentComponent.clientWidth;
                                const imageHeight = transformComponentRef.current.instance.contentComponent.clientHeight;
                                
                                const maxX = (imageWidth * newScale - containerWidth) / 2;
                                const maxY = (imageHeight * newScale - containerHeight) / 2;
                                
                                const normalizedX = maxX !== 0 ? (positionX / maxX) : 0;
                                const normalizedY = maxY !== 0 ? (positionY / maxY) : 0;
                                
                                setViewportPosition({
                                  x: normalizedX,
                                  y: normalizedY
                                });
                              }
                            }}
                            sx={{ 
                              width: 48, 
                              height: 48,
                              color: theme => theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                              '&:hover': {
                                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(25, 118, 210, 0.08)'
                              }
                            }}
                            title="Zoom In"
                          >
                            <ZoomInIcon fontSize="large" />
                          </IconButton>
                          <IconButton 
                            onClick={() => {
                              zoomOut(0.1);
                              const newScale = Math.max(scale - 0.1, 0.1);
                              setScale(newScale);
                              setMagnification(newScale);
                              if (transformComponentRef.current) {
                                const { positionX, positionY } = transformComponentRef.current.state;
                                const containerWidth = transformComponentRef.current.instance.wrapperComponent.clientWidth;
                                const containerHeight = transformComponentRef.current.instance.wrapperComponent.clientHeight;
                                const imageWidth = transformComponentRef.current.instance.contentComponent.clientWidth;
                                const imageHeight = transformComponentRef.current.instance.contentComponent.clientHeight;
                                
                                const maxX = (imageWidth * newScale - containerWidth) / 2;
                                const maxY = (imageHeight * newScale - containerHeight) / 2;
                                
                                const normalizedX = maxX !== 0 ? (positionX / maxX) : 0;
                                const normalizedY = maxY !== 0 ? (positionY / maxY) : 0;
                                
                                setViewportPosition({
                                  x: normalizedX,
                                  y: normalizedY
                                });
                              }
                            }}
                            sx={{ 
                              width: 48, 
                              height: 48,
                              color: theme => theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                              '&:hover': {
                                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(25, 118, 210, 0.08)'
                              }
                            }}
                            title="Zoom Out"
                          >
                            <ZoomOutIcon fontSize="large" />
                          </IconButton>
                          <IconButton 
                            onClick={() => {
                              resetTransform();
                              setScale(1);
                              setMagnification(1);
                              setViewportPosition({ x: 0, y: 0 });
                            }}
                            sx={{ 
                              width: 48, 
                              height: 48,
                              color: theme => theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                              '&:hover': {
                                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(25, 118, 210, 0.08)'
                              }
                            }}
                            title="Reset View"
                          >
                            <RestartAltIcon fontSize="large" />
                          </IconButton>
                    </Box>

                        <TransformComponent
                          wrapperStyle={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden"
                          }}
                        >
                          <div style={{ 
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <img
                              src="/WhatsApp Image 2025-03-18 at 14.23.11_c9df4a0c.jpg"
                              alt="WSI View"
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                            height: 'auto',
                                display: 'block',
                                backgroundColor: '#fff',
                                imageRendering: 'pixelated',
                                objectFit: 'contain'
                          }}
                        />
                        {renderDetectionBoxes()}
                      </div>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
          </Paper>
        </Grid>
      </Grid>
    </Container>
          {generateReport()}
          {showAiPanel && <AiAnalysisPanel />}
        </Box>
      </ThemeProvider>
  );
}

export default App; 