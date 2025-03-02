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
    "Conocimiento medular": [],
    "Conocimiento gerencial": [],
    "Conocimiento en tecnologías de la información y las comunicaciones": [],
    "Conocimiento organizacional": [],
    "Conocimiento relacional": [],
    "Conocimiento temas experto": [],
  });

  const sectionDescriptions:  { [key: string]: React.ReactNode } = {
    "Conocimiento medular": (
      <span>Son <strong>conocimientos esenciales que generan ventajas competitivas</strong> a la subsecretaria de tesorería de la secretaria de hacienda como por ejemplo gestión de ingresos, gestión del gasto público, análisis de riesgos, entre otros, también son <strong>conocimientos nuevos, algo especial y único</strong>, como por ejemplo modelos de predicción, transformación digital, entre otros o <strong>conocimientos esenciales</strong> que se tienen desde la formación profesional como ingeniería económica, inversiones entre otros.
      </span>)
      ,
    "Conocimiento gerencial": (
      <span>
      Son <strong>conocimientos no esenciales</strong> definidos como la información, experiencia y habilidades estratégicas que facilitan la toma de decisiones y la gestión organizacional eficaz, puede incluir, por ejemplo: gestión y gerencia de proyectos, gestión financiera, gestión del cambio, gestión de la productividad, gestión de conocimiento, etc.
      </span>
    ),
    "Conocimiento en tecnologías de la información y las comunicaciones": 
    (
      <span>
      Son <strong>conocimientos no esenciales</strong>. Se refiere a conocimientos y competencias relacionadas con las Tecnologías de la Información y la Comunicación, puede incluir, por ejemplo: herramientas ofimáticas como Word, Excel, OneDrive, Teams, Google Drive, LibreOffice, entre otros, herramientas informáticas tales como sistemas operativos, bases de datos (SQL), lenguajes de programación (Python, Javascript, entre otros) o software especifico como SAP, Adobe, etc.
      </span>
      ),
    "Conocimiento organizacional": 
    (
      <span>
        Son <strong>conocimientos no esenciales</strong> que contribuyen a la organización, planificación y desarrollo de procesos. Puede incluir por ejemplo: estructura organizacional, procesos, sistemas de calidad, atención al cliente, gestión de equipos, toma de decisiones, gestión del tiempo, responsabilidad social y corporativa, innovación, liderazgo, negociación, etc.
      </span>
        ),
    "Conocimiento relacional": (
      <span>
        Son <strong>conocimientos no esenciales</strong> relacionados o importantes para el cumplimiento de sus funciones y labores en su cargo, los cuales incluyen: decretos tributarios y de crédito público, normatividades, leyes como principios y normas contables y de información financiera, entidades (DIAN, Ministerio, Contraloría y demás), manuales del Estado, etc.
        </span>
        ),
    "Conocimiento temas experto": (
    <span>
      Son <strong>conocimientos no esenciales</strong> que implican responder a la pregunta ¿En qué tipo de conocimiento me considero un experto? Puede ser, por ejemplo: investigación cualitativa, gestión tecnológica, evaluación de puestos de trabajo, entorno económico, regulaciones, redes y seguridad, etc. No necesariamente estos conocimientos generan ventaja competitiva"
    </span>
    ),
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
  const [unidad, setUnidad] = useState('');
  const sectionKeys = [...Object.keys(sections), 'Experiencia'];
  const [unlockedSections, setUnlockedSections] = useState<string[]>(['Conocimiento medular']);
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
      setCurrentSection('Conocimiento medular'); // Inicia con la primera sección
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

    data.push({
      Sección: "Información General",
      Pregunta: "Unidad a la que pertenece",
      Valor: '',
      Respuesta: unidad, // Aquí se agrega el valor seleccionado
    });

    // Procesar "Temas Expertos"
    const temasExpertosData = sections["Conocimiento temas experto"]
      .map((entry) => ({
        Sección: "Conocimiento temas experto",
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
          <Typography variant='h2' align='center' gutterBottom>
          Capital Intelectual Tesorería
          </Typography>
          <Typography sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
          El capital intelectual implica administrar el conocimiento tácito (intangible) y explícito (tangible) y esto se logra mediante acciones, mecanismos o instrumentos orientados a identificar, generar, capturar, transferir, apropiar, analizar, valorar, difundir y preservar el conocimiento al interior de una organización.
        </Typography>
          <Typography variant="h3" align="center" gutterBottom>
            Bienvenido(a) Hoja de conocimiento
          </Typography>
          <Typography variant="body1" paragraph>
          Herramienta para identificar el conocimiento que poseen las personas y los grupos dentro de una organización, estructurada en cinco componentes principales. Permite reconocer aspectos menos evidentes, como la experiencia, los proyectos, las áreas de especialización y, en general, el conocimiento práctico de los individuos. Su finalidad es la creación de un banco de páginas amarillas dentro de la organización
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
          <Typography variant="h6" gutterBottom>
            Seleccione la unidad a la que pertenece 
          </Typography>
          <Select
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            displayEmpty
            fullWidth
            required
          >
            <MenuItem value="" disabled>
              Seleccione una unidad
            </MenuItem>
            <MenuItem value="Control y riesgos">Control y riesgos</MenuItem>
            <MenuItem value="Inversiones">Inversiones</MenuItem>
            <MenuItem value="Caja">Caja</MenuItem>
            <MenuItem value="Caja - pagos">Caja - pagos</MenuItem>
            <MenuItem value="Caja - recaudos">Caja - recaudos</MenuItem>
            <MenuItem value="Cobranza - coactivo">Cobranza - coactivo</MenuItem>
            <MenuItem value="Cobranza - fp">Cobranza - facilidades de pago</MenuItem>
            <MenuItem value="Cobranza - concursales">Cobranza - concursales</MenuItem>
            <MenuItem value="Cobranza - persuasivo">Cobranza - persuasivo</MenuItem>
            <MenuItem value="Despacho">Despacho subsecretaria</MenuItem>
          </Select>
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
        <Typography variant="h6">
          <strong>Créditos</strong>
        </Typography>
        <Typography variant="body2">Desarrollado por Julián Uribe - julian.uribe@medellin.gov.co</Typography>
        <Typography variant="body2">Desarrollado por Alejandro Salgar - alejandro.salgar@medellin.gov.co</Typography>
        <Typography variant="body2">Supervisado por Jorge Iván Brand Ortiz Ph.D - Subsecretaria de Tesorería - Secretaria de Hacienda</Typography>
      </Box>
      <Typography variant="h6"><strong>Referencias</strong></Typography>
            
            <Typography variant="body2" paragraph>
            Muñoz, A., et al.  ABECÉ del Modelo de Gestión del Conocimiento y la Innovación en el ITM (1.ª ed.). Editorial ITM. doi.org/10.22430/reporte.5958
            </Typography>
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
              <Box>
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
      {currentSection !== "Conocimiento temas experto" && (
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

  {/* Botón de agregar colocado al final de la lista */}
  <Button
    variant="outlined"
    color="primary"
    onClick={() => handleAddInput(currentSection || '')}
    style={{ marginBottom: '20px', marginTop: '10px' }}
  >
    + AGREGAR DOMINIO DE CONOCIMIENTO
  </Button>

 
</Box>


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
