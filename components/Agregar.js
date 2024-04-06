import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Agregar = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sexo, setSexo] = useState('Hombre');
  const [tipoSangre, setTipoSangre] = useState('A+');
  const [telefono, setTelefono] = useState('');
  const [enfermedades, setEnfermedades] = useState('');
  const [contactoNombre, setContactoNombre] = useState('');
  const [contactoApellidos, setContactoApellidos] = useState('');
  const [contactoTelefono, setContactoTelefono] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [showDatePickerInicio, setShowDatePickerInicio] = useState(false);
  const [showDatePickerNacimiento, setShowDatePickerNacimiento] = useState(false);
  const [fechaTermino, setFechaTermino] = useState(null);

  useEffect(() => {
    // Calcular fecha de término al mes
    const fechaTerminoCalculada = new Date(fechaInicio);
    fechaTerminoCalculada.setMonth(fechaTerminoCalculada.getMonth() + 1);
    setFechaTermino(fechaTerminoCalculada);
  }, [fechaInicio]);

  const handleSubmit = () => {
    // Aquí podrías enviar los datos a tu servidor o realizar alguna acción con ellos
    console.log({
      nombre,
      apellidos,
      sexo,
      tipoSangre,
      telefono,
      enfermedades,
      contactoNombre,
      contactoApellidos,
      contactoTelefono,
      fechaInicio,
      fechaNacimiento,
      fechaTermino,
    });
  };

  const handleDateChangeInicio = (event, selectedDate) => {
    const currentDate = selectedDate || fechaInicio;
    setShowDatePickerInicio(false);
    setFechaInicio(currentDate);
  };

  const handleDateChangeNacimiento = (event, selectedDate) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowDatePickerNacimiento(false);
    setFechaNacimiento(currentDate);
  };

  // Formatear la fecha de nacimiento para mostrarla en el botón
  const fechaNacimientoFormatted = `${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth() + 1}/${fechaNacimiento.getFullYear()}`;
  const fechaInicioFormatted = `${fechaInicio.getDate()}/${fechaInicio.getMonth() + 1}/${fechaInicio.getFullYear()}`;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>Nombre:</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Apellidos:</Text>
      <TextInput
        value={apellidos}
        onChangeText={setApellidos}
        placeholder="Apellidos"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Sexo:</Text>
      <Picker selectedValue={sexo} onValueChange={setSexo} style={{ marginBottom: 10 }}>
        <Picker.Item label="Hombre" value="Hombre" />
        <Picker.Item label="Mujer" value="Mujer" />
      </Picker>

      <Text>Tipo de Sangre:</Text>
      <Picker selectedValue={tipoSangre} onValueChange={setTipoSangre} style={{ marginBottom: 10 }}>
        <Picker.Item label="A+" value="A+" />
        <Picker.Item label="A-" value="A-" />
        <Picker.Item label="B+" value="B+" />
        <Picker.Item label="B-" value="B-" />
        <Picker.Item label="O+" value="O+" />
        <Picker.Item label="O-" value="O-" />
        <Picker.Item label="AB+" value="AB+" />
        <Picker.Item label="AB-" value="AB-" />
      </Picker>

      <Text>Número de Teléfono:</Text>
      <TextInput
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Número de Teléfono"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Enfermedades:</Text>
      <TextInput
        value={enfermedades}
        onChangeText={setEnfermedades}
        placeholder="Enfermedades"
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Fecha de nacimiento:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Button title={fechaNacimientoFormatted} onPress={() => setShowDatePickerNacimiento(true)} />
        {showDatePickerNacimiento && (
          <DateTimePicker
            testID="dateTimePickerNacimiento"
            value={fechaNacimiento}
            mode="date"
            display="spinner"
            onChange={handleDateChangeNacimiento}
          />
        )}
      </View>

      <Text>Fecha de inicio:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Button title={fechaInicioFormatted} onPress={() => setShowDatePickerInicio(true)} />
        {showDatePickerInicio && (
          <DateTimePicker
            testID="dateTimePickerInicio"
            value={fechaInicio}
            mode="date"
            display="spinner"
            onChange={handleDateChangeInicio}
          />
        )}
      </View>

      <Text>Fecha de término:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text>
          {fechaTermino && (
            <>
              {fechaTermino.getDate()}/{fechaTermino.getMonth() + 1}/{fechaTermino.getFullYear()}
            </>
          )}
        </Text>
      </View>

      <Text>Contacto de Emergencia:</Text>
      <Text>Nombre:</Text>
      <TextInput
        value={contactoNombre}
        onChangeText={setContactoNombre}
        placeholder="Nombre del Contacto"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Apellidos:</Text>
      <TextInput
        value={contactoApellidos}
        onChangeText={setContactoApellidos}
        placeholder="Apellidos del Contacto"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Número de Teléfono:</Text>
      <TextInput
        value={contactoTelefono}
        onChangeText={setContactoTelefono}
        placeholder="Número de Teléfono del Contacto"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Guardar" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default Agregar;
