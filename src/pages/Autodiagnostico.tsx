import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

interface SectionInputs {
  [key: string]: { input: string; rating: number }[];
}


const Autodiagnostico: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SectionInputs>({
    Medular: [],
    Gerencial: [],
    TICs: [],
    Organizacional: [],
    Relacional: [],
    "Temas Expertos": [],
  });

  const sectionDescriptions: { [key: string]: string } = {
    Medular: "Conocimientos que generan ventajas competitivas a la subsecretaria de tesorería, conocimientos nuevos, algo especial y único. Conocimientos esenciales que se tienen. Agregar.",
    Gerencial: "No esencial, puede incluir por ejemplo: Gestión de proyectos, gerencia de proyectos, gestión de conocimiento, etc.",
    TICs: "No esencial. Se refiere a conocimientos y competencias relacionadas con las Tecnologías de la Información y la Comunicación, puede incluir, por ejemplo: herramientas ofimáticas, herramientas informáticas, software especifico, etc.",
    Organizacional: "No esencial. Son conocimientos que contribuyen a la organización, planificación y desarrollo de procesos. Puede incluir por ejemplo: estructura organizacional, procesos, sistemas de calidad, atención al cliente, etc.",
    Relacional: "No esencial. Puede incluir por ejemplo conocimientos relacionados o importantes para el cumplimiento de sus funciones, los cuales incluyen: normatividades, leyes, entidades, etc.",
    "Temas Expertos": "No esencial. Implica responder la pregunta ¿En qué tipo de conocimiento me considero un experto? Puede iniciar su declaración como: conocimiento en investigación cualitativa, conocimiento en evaluación de puestos de trabajo, etc. No necesariamente estos conocimientos generan ventaja competitiva.",
    Experiencia: "Detalla tus proyectos, conocimientos no laborales, educación y reconocimientos obtenidos.",
  };

  const [experienceInputs, setExperienceInputs] = useState<{
    [key: string]: { input: string }[];
  }>({
    "Educación formal, no formal y autoaprendizaje": [],
    "Reconocimientos/publicaciones": [],
  });

  const [openTextFields, setOpenTextFields] = useState<{
    [key: string]: string;
  }>({
    "Proyecto presente": '',
    "Proyecto futuro": '',
    "Proyecto WOW pasado": '',
    "Conocimientos no relacionados con el trabajo y hobbies": '',
  });

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const sectionKeys = [...Object.keys(sections), 'Experiencia'];
  const [unlockedSections, setUnlockedSections] = useState<string[]>(['Medular']);
  const [idiomas, setIdiomas] = useState<{ input: string; rating: number }[]>([]);

  const validarCorreo = (correo: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleStart = () => {
    if (!name || !surname || !email) {
      setShowAlert(true);
      setEmailError('');
    } else if (!validarCorreo(email)) {
      setEmailError('Por favor ingrese un correo válido.');
      setShowAlert(false);
    } else {
      setEmailError('');
      setShowAlert(false);
      setCurrentSection('Medular'); // Inicia con la primera sección
    }
  };

  const handleAddInput = (section: keyof SectionInputs) => {
    setSections({
      ...sections,
      [section]: [...(sections[section] || []), { input: '', rating: 1 }],
    });
  };
  

  const handleInputChange = (
    section: string,
    index: number,
    value: string
  ) => {
    const updatedSection = [...sections[section]];
    updatedSection[index].input = value;
    setSections({ ...sections, [section]: updatedSection });
  };

  const handleAddIdioma = () => {
    setIdiomas([...idiomas, { input: '', rating: 1 }]);
  };
  
  const handleIdiomaChange = (index: number, value: string) => {
    const updatedIdiomas = [...idiomas];
    updatedIdiomas[index].input = value;
    setIdiomas(updatedIdiomas);
  };
  
  const handleIdiomaRatingChange = (index: number, value: number) => {
    const updatedIdiomas = [...idiomas];
    updatedIdiomas[index].rating = value;
    setIdiomas(updatedIdiomas);
  };
  
  const handleRemoveIdioma = (index: number) => {
    const updatedIdiomas = idiomas.filter((_, i) => i !== index);
    setIdiomas(updatedIdiomas);
  };
  

  const handleDropdownChange = (
    section: keyof SectionInputs,
    index: number,
    value: number
  ) => {
    const updatedSection = [...sections[section]];
    updatedSection[index].rating = value;
    setSections({ ...sections, [section]: updatedSection });
  };

  const handleRemoveInput = (section: string, index: number) => {
    const updatedSection = sections[section].filter((_, i) => i !== index);
    setSections({ ...sections, [section]: updatedSection });
  };

  const handleExperienceAddInput = (category: string) => {
    setExperienceInputs({
      ...experienceInputs,
      [category]: [...experienceInputs[category], { input: '' }],
    });
  };

  const handleExperienceInputChange = (
    category: string,
    index: number,
    value: string
  ) => {
    const updatedCategory = [...experienceInputs[category]];
    updatedCategory[index].input = value;
    setExperienceInputs({
      ...experienceInputs,
      [category]: updatedCategory,
    });
  };

  const handleExperienceRemoveInput = (category: string, index: number) => {
    const updatedCategory = experienceInputs[category].filter((_, i) => i !== index);
    setExperienceInputs({
      ...experienceInputs,
      [category]: updatedCategory,
    });
  };

  const handleOpenTextChange = (field: string, value: string) => {
    setOpenTextFields({
      ...openTextFields,
      [field]: value,
    });
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentSection(newValue);
  };

  const handleNextSection = () => {
    const currentIndex = sectionKeys.indexOf(currentSection || '');
    if (currentIndex < sectionKeys.length - 1) {
      const nextSection = sectionKeys[currentIndex + 1];
      setUnlockedSections((prev) => [...new Set([...prev, nextSection])]);
      setCurrentSection(nextSection);
    }
  };


  const experienceQuestions = {
    "Proyecto presente": "¿En qué proyectos se encuentra actualmente trabajando o desempeñando?",
    "Proyecto futuro": "¿Cual es su proyecto profesional a futuro?",
    "Proyecto WOW pasado": "Son aquellos que han generado aprendizajes significativos a las organizaciones o entidades donde ha trabajado.",
    "Conocimientos no relacionados con el trabajo y hobbies": "Otros conocimientos o habilidades, hobbies o actividades de entretenimiento, por ejemplo: batería, cerámica, guitarra, etc.",
    "Educación formal, no formal y autoaprendizaje": "Aspectos relacionados con educación, pregrado, posgrados, diplomados, cursos. Indique los más importantes y más recientes.",
    "Reconocimientos/publicaciones": "Incluya reconocimientos recibidos o publicaciones destacadas relacionadas con su trayectoria profesional o académica."
  };
  
  // Nueva entrada para Redes Sociales
  const [socialNetworks, setSocialNetworks] = useState<{ input: string }[]>([]);
  
  const handleAddSocialNetwork = () => {
    setSocialNetworks([...socialNetworks, { input: '' }]);
  };
  
  const handleSocialNetworkChange = (index: number, value: string) => {
    const updatedSocialNetworks = [...socialNetworks];
    updatedSocialNetworks[index].input = value;
    setSocialNetworks(updatedSocialNetworks);
  };
  
  const handleRemoveSocialNetwork = (index: number) => {
    const updatedSocialNetworks = socialNetworks.filter((_, i) => i !== index);
    setSocialNetworks(updatedSocialNetworks);
  };
  

  const handleFinish = () => {
    const data: { Sección: string; Pregunta: string; Valor: string | number; Respuesta: string }[] = [];

    // Procesar las secciones estándar
    Object.keys(sections).forEach((section) => {
      sections[section].forEach((entry) => {
        data.push({
          Sección: section,
          Pregunta: entry.input,
          Valor: entry.rating || '',
          Respuesta: '',
        });
      });
    });

    // Procesar "Temas Expertos"
    const temasExpertosData = sections["Temas Expertos"]
      .map((entry) => ({
        Sección: "Temas Expertos",
        Pregunta: entry.input,
        Valor: '',
        Respuesta: '',
      }))
      .filter((entry) => entry.Pregunta.trim() !== "");
    data.push(...temasExpertosData);

    // Procesar la sección "Experiencia"
    Object.entries(openTextFields).forEach(([question, answer]) => {
      if (answer.trim() !== "") {
        data.push({
          Sección: "Experiencia",
          Pregunta: question,
          Valor: '',
          Respuesta: answer,
        });
      }
    });
    Object.entries(experienceInputs).forEach(([category, inputs]) => {
      inputs.forEach((entry) => {
        data.push({
          Sección: "Experiencia",
          Pregunta: category,
          Valor: '',
          Respuesta: entry.input,
        });
      });
    });

    // Procesar los datos de "Idiomas"
idiomas.forEach((idioma) => {
  data.push({
    Sección: "Idiomas",
    Pregunta: idioma.input,
    Valor: idioma.rating || '',
    Respuesta: '',
  });
});

// Procesar "Redes Sociales"
socialNetworks.forEach((network) => {
  if (network.input.trim() !== "") {
    data.push({
      Sección: "Redes Sociales",
      Pregunta: "URL",
      Valor: '',
      Respuesta: network.input,
    });
  }
});



    // Generar el archivo Excel
    const worksheet = XLSX.utils.json_to_sheet(data, { header: ["Sección", "Pregunta", "Valor", "Respuesta"] });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");
    const fileName = `${name}_${surname}_Resultados.xlsx`;
    XLSX.writeFile(workbook, fileName);

    // Redirigir a la página de gestión del conocimiento
    navigate('/gestion-conocimiento');
  };

  const isSectionComplete = () => {
    if (currentSection === 'Experiencia') {
      return (
        Object.values(openTextFields).some((value) => value.trim() !== '') ||
        Object.values(experienceInputs).some((inputs) => 
          inputs.every((entry) => entry.input.trim() !== '')
        )
      );
    }
  
    // Validar que todas las preguntas tengan texto
    return sections[currentSection || '']?.every((entry) => entry.input.trim() !== '');
  };
  

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {!currentSection ? (
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Bienvenido(a) Hoja de conocimiento
          </Typography>
          <Typography variant="body1" paragraph>
            Herramienta de análisis para identificar y caracterizar el sistema dinámico del conocimiento que poseen las personas y los grupos en una organización. Calcula aspectos menos reconocibles como la experiencia o el conocimiento práctico.
          </Typography>
          <Typography variant="body1" paragraph>
            Ingrese su información para continuar:
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
          <TextField
            label="Apellido"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            size="small"
          />
          <TextField
            label="Correo"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            error={!!emailError}
            helperText={emailError}
          />
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor complete todos los campos antes de continuar.
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            style={{ marginTop: '20px' }}
          >
            Comenzar
          </Button>
          <Box marginTop={4} textAlign="center">
        <Typography variant="body2">
          <strong>Créditos</strong>
        </Typography>
        <Typography variant="body2">Desarrollado por Julián Uribe - julian.uribe@medellin.gov.co</Typography>
        <Typography variant="body2">Desarrollado por Alejandro Salgar - alejandro.salgar@medellin.gov.co</Typography>
        <Typography variant="body2">Supervisado por Jorge Iván Brand Ortiz Ph.D - Subsecretaria de Tesorería - Secretaria de Hacienda</Typography>
      </Box>
        </Box>
      ) : (
        <Box>
          <AppBar position="sticky" color="transparent" elevation={0}>
            <Toolbar>
              <Tabs
                value={currentSection}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons="auto"
              >
                {sectionKeys.map((key) => (
                  <Tab
                    key={key}
                    label={key}
                    value={key}
                    disabled={!unlockedSections.includes(key)}
                  />
                ))}
              </Tabs>
            </Toolbar>
          </AppBar>

          <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
            {currentSection}
          </Typography>
          {currentSection && (
            <Typography variant="body1" paragraph>
              {sectionDescriptions[currentSection]}
            </Typography>
          )}

          {currentSection === 'Experiencia' ? (
            <Box>
            {Object.keys(openTextFields).map((field) => (
              <Box key={field} marginBottom={3}>
                <Typography variant="subtitle1">
                  {field}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {experienceQuestions[field as keyof typeof experienceQuestions]}
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={openTextFields[field]}
                  onChange={(e) => handleOpenTextChange(field, e.target.value)}
                />
              </Box>
            ))}
              {['Educación formal, no formal y autoaprendizaje', 'Reconocimientos/publicaciones'].map(
                (category) => (
                  <Box key={category} marginBottom={4}>
                    <Typography variant="h6">{category}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleExperienceAddInput(category)}
                      style={{ marginTop: '10px', marginBottom: '10px' }}
                    >
                      + AGREGAR DOMINIO DE CONOCIMIENTO
                    </Button>
                    {experienceInputs[category].map((item, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        marginBottom={2}
                      >
                        <TextField
                          value={item.input}
                          onChange={(e) =>
                            handleExperienceInputChange(category, index, e.target.value)
                          }
                          fullWidth
                          size="small"
                          margin="dense"
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleExperienceRemoveInput(category, index)
                          }
                          style={{ marginLeft: '10px' }}
                        >
                          Eliminar
                        </Button>
                      </Box>
                    ))}


                  </Box>
                )
              )}

<Box marginTop={4}>
  <Typography variant="h6">Redes Sociales</Typography>
  <Button
    variant="outlined"
    color="primary"
    onClick={handleAddSocialNetwork}
    style={{ marginTop: '10px', marginBottom: '10px' }}
  >
    + Agregar URL de red social
  </Button>
  {socialNetworks.map((network, index) => (
    <Box
      key={index}
      display="flex"
      alignItems="center"
      marginBottom={2}
    >
      <TextField
        label="URL de Red Social"
        value={network.input}
        onChange={(e) => handleSocialNetworkChange(index, e.target.value)}
        fullWidth
        size="small"
        margin="dense"
        style={{ marginRight: '10px' }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleRemoveSocialNetwork(index)}
        style={{ marginLeft: '10px' }}
      >
        Eliminar
      </Button>
    </Box>
  ))}
</Box>


<Box marginTop={4}>
  <Typography variant="h6">Idiomas</Typography>
  <Button
    variant="outlined"
    color="primary"
    onClick={handleAddIdioma}
    style={{ marginTop: '10px', marginBottom: '10px' }}
  >
    + Agregar idioma
  </Button>
  {idiomas.map((idioma, index) => (
    <Box
      key={index}
      display="flex"
      alignItems="center"
      marginBottom={2}
    >
      <TextField
        label="Idioma"
        value={idioma.input}
        onChange={(e) => handleIdiomaChange(index, e.target.value)}
        fullWidth
        size="small"
        margin="dense"
        style={{ marginRight: '10px' }}
      />
      <Select
        value={idioma.rating}
        onChange={(e) => handleIdiomaRatingChange(index, parseInt(e.target.value as string))}
        size="small"
        style={{ width: '120px' }}
      >
        <MenuItem value={0} disabled>
          Nivel
        </MenuItem>
        <MenuItem value={1}>Básico</MenuItem>
        <MenuItem value={2}>Intermedio</MenuItem>
        <MenuItem value={3}>Avanzado</MenuItem>
        <MenuItem value={4}>Fluido</MenuItem>
        <MenuItem value={5}>Nativo</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleRemoveIdioma(index)}
        style={{ marginLeft: '10px' }}
      >
        Eliminar
      </Button>
    </Box>
  ))}
</Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                style={{ marginTop: '20px' }}
              >
                Finalizar y Exportar a Excel
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAddInput(currentSection || '')}
                style={{ marginBottom: '20px' }}
              >
                + AGREGAR DOMINIO DE CONOCIMIENTO
              </Button>
              {sections[currentSection || ''].map((item, index) => (
  <Box
    key={index}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    marginBottom={2}
  >
    <TextField
      label="Conocimiento"
      value={item.input}
      onChange={(e) =>
        handleInputChange(currentSection || '', index, e.target.value)
      }
      fullWidth
      size="small"
      margin="dense"
      style={{ marginRight: '10px' }}
    />
    {currentSection !== "Temas Expertos" && (
      <Box>
        <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
        disponible
        </Typography>
        <Select
          value={item.rating}
          onChange={(e) =>
            handleDropdownChange(
              currentSection || '',
              index,
              parseInt(e.target.value as string, 5)
            )
          }
          size="small"
          style={{ width: '120px' }}
        >
          <MenuItem value={0} disabled>
          disponible
          </MenuItem>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </Box>
    )}
    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleRemoveInput(currentSection || '', index)}
      style={{ marginLeft: '10px' }}
    >
      Eliminar
    </Button>
  </Box>
))}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNextSection}
                disabled={!isSectionComplete()}
                style={{ marginTop: '40px' }}
              >
                Siguiente
              </Button>
            </Box>
          )}
        </Box>
      )}
     
    </Container>
  );
};

export default Autodiagnostico;
