import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import appFirebase from './Credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Inicialización de la instancia de Firestore
const db = getFirestore(appFirebase);

// Estado inicial del formulario
const initialState = {
  nombre: '',
  apellidos: '',
  sexo: 'Hombre',
  tipoSangre: 'A+',
  telefono: '',
  enfermedades: '',
  contactoNombre: '',
  contactoApellidos: '',
  contactoTelefono: '',
  fechaInicio: new Date(),
  fechaNacimiento: new Date(),
  fechaTermino: null,
};

const Agregar = ({ navigation }) => {
  const [formData, setFormData] = useState(initialState);
  const [showDatePickerNacimiento, setShowDatePickerNacimiento] = useState(false);
  const [showDatePickerInicio, setShowDatePickerInicio] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efecto para calcular la fecha de término
  useEffect(() => {
    const fechaTerminoCalculada = new Date(formData.fechaInicio);
    fechaTerminoCalculada.setMonth(fechaTerminoCalculada.getMonth() + 1);
    setFormData(prevState => ({ ...prevState, fechaTermino: fechaTerminoCalculada }));
  }, [formData.fechaInicio]);


 // Función para manejar el envío del formulario
const handleSubmit = async () => {

  if (isSubmitting) return; // Evitar envíos duplicados mientras se procesa la solicitud

  setIsSubmitting(true); // Deshabilitar temporalmente el botón de guardar

  // Verificar si los campos obligatorios están llenos
  const { nombre, apellidos, telefono, contactoNombre, contactoApellidos, contactoTelefono } = formData;
  const mandatoryFieldsFilled = nombre && apellidos && telefono && contactoNombre && contactoApellidos && contactoTelefono;

  // Verificar si el campo de enfermedades está vacío
  const enfermedadesValue = formData.enfermedades.trim() ? formData.enfermedades : 'Ninguna';

  if (mandatoryFieldsFilled) {
    try {
      // Agregar documento a Firestore
      await addDoc(collection(db, 'clientes'), { ...formData, enfermedades: enfermedadesValue });
      // Mostrar alerta de éxito
      Alert.alert(
        'Éxito',
        'Los datos se guardaron exitosamente.',
        [{ text: 'Aceptar', onPress: () => {
          setFormData(initialState);
          navigation.navigate('Lista'); // Agregar navegación a la pantalla 'Details'
        }}],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    // Mostrar una alerta indicando que se deben completar los campos obligatorios
    Alert.alert(
      'Campos obligatorios incompletos',
      'Por favor, complete todos los campos obligatorios antes de guardar.',
      [{ text: 'Aceptar' }],
      { cancelable: false }
    );
  }
  setIsSubmitting(false); // Habilitar el botón de guardar después de procesar la solicitud
};

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (event, selectedDate, name) => {
    if (event.type === 'dismissed') {
      // No actualizar el estado si el usuario cierra el selector de fecha sin seleccionar una fecha
      if (name === 'fechaNacimiento') setShowDatePickerNacimiento(false);
      else if (name === 'fechaInicio') setShowDatePickerInicio(false);
      return;
    }
  
    const currentDate = selectedDate || formData[name];
    // No actualizar el estado aquí
    if (name === 'fechaNacimiento') setShowDatePickerNacimiento(false);
    else if (name === 'fechaInicio') setShowDatePickerInicio(false);
  
    // Actualizar el estado solo cuando se confirma la selección de fecha
    setFormData(prevState => ({ ...prevState, [name]: currentDate }));
  };

  // Función para renderizar los date pickers
  const renderDatePicker = (name, formattedDate, showDatePicker, onChange, labelText) => (
    <View style={{ marginBottom: 10 }}>
      <Text>{labelText}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button title={formattedDate} onPress={() => onChange(true)} />
        {showDatePicker && (
          <DateTimePicker
            testID={`dateTimePicker${name}`}
            value={formData[name]}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => handleDateChange(event, selectedDate, name)}
          />
        )}
      </View>
    </View>
  );

  // Formateo de fechas para mostrarlas en el botón
  const fechaNacimientoFormatted = `${formData.fechaNacimiento.getDate()}/${formData.fechaNacimiento.getMonth() + 1}/${formData.fechaNacimiento.getFullYear()}`;
  const fechaInicioFormatted = `${formData.fechaInicio.getDate()}/${formData.fechaInicio.getMonth() + 1}/${formData.fechaInicio.getFullYear()}`;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Campos del formulario */}
      <Text>Nombre:</Text>
      <TextInput
        value={formData.nombre}
        onChangeText={value => handleChange('nombre', value)}
        placeholder="Nombre"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Renderizado del campo de apellidos */}
      <Text>Apellidos:</Text>
      <TextInput
        value={formData.apellidos}
        onChangeText={value => handleChange('apellidos', value)}
        placeholder="Apellidos"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Renderizado del campo de sexo */}
      <Text>Sexo:</Text>
      <Picker selectedValue={formData.sexo} onValueChange={value => handleChange('sexo', value)} style={{ marginBottom: 10 }}>
        <Picker.Item label="Hombre" value="Hombre" />
        <Picker.Item label="Mujer" value="Mujer" />
      </Picker>

      {/* Renderizado del campo de tipo de sangre */}
      <Text>Tipo de Sangre:</Text>
      <Picker selectedValue={formData.tipoSangre} onValueChange={value => handleChange('tipoSangre', value)} style={{ marginBottom: 10 }}>
        <Picker.Item label="A+" value="A+" />
        <Picker.Item label="A-" value="A-" />
        <Picker.Item label="B+" value="B+" />
        <Picker.Item label="B-" value="B-" />
        <Picker.Item label="O+" value="O+" />
        <Picker.Item label="O-" value="O-" />
        <Picker.Item label="AB+" value="AB+" />
        <Picker.Item label="AB-" value="AB-" />
      </Picker>

      {/* Renderizado del campo de número de teléfono */}
      <Text>Número de Teléfono:</Text>
      <TextInput
        value={formData.telefono}
        onChangeText={value => handleChange('telefono', value)}
        placeholder="Número de Teléfono"
        keyboardType="numeric"
        maxLength={10}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Renderizado del campo de enfermedades */}
      <Text>Enfermedades:</Text>
      <TextInput
        value={formData.enfermedades}
        onChangeText={value => handleChange('enfermedades', value)}
        placeholder="Enfermedades"
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      {/* Renderizado del date picker para la fecha de nacimiento */}
      {renderDatePicker('fechaNacimiento', fechaNacimientoFormatted, showDatePickerNacimiento, setShowDatePickerNacimiento, 'Fecha de Nacimiento:')}

      {/* Renderizado del date picker para la fecha de inicio */}
      {renderDatePicker('fechaInicio', fechaInicioFormatted, showDatePickerInicio, setShowDatePickerInicio, 'Fecha de Inicio:')}

      {/* Mostrar la fecha de término */}
      <Text>Fecha de término:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text>
          {formData.fechaTermino && (
            <>
              {formData.fechaTermino.getDate()}/{formData.fechaTermino.getMonth() + 1}/{formData.fechaTermino.getFullYear()}
            </>
          )}
        </Text>
      </View>

      {/* Renderizado del campo de contacto de emergencia */}
      <Text>Contacto de Emergencia:</Text>
      <Text>Nombre:</Text>
      <TextInput
        value={formData.contactoNombre}
        onChangeText={value => handleChange('contactoNombre', value)}
        placeholder="Nombre del Contacto"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Renderizado del campo de apellidos del contacto de emergencia */}
      <Text>Apellidos:</Text>
      <TextInput
        value={formData.contactoApellidos}
        onChangeText={value => handleChange('contactoApellidos', value)}
        placeholder="Apellidos del Contacto"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Renderizado del campo de número de teléfono del contacto de emergencia */}
      <Text>Número de Teléfono:</Text>
      <TextInput
        value={formData.contactoTelefono}
        onChangeText={value => handleChange('contactoTelefono', value)}
        placeholder="Número de Teléfono del Contacto"
        keyboardType="numeric"
        maxLength={10}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Botón para enviar el formulario */}
      <Button title="Guardar" onPress={handleSubmit} disabled={isSubmitting}/>
    </ScrollView>
  );
};

export default Agregar;