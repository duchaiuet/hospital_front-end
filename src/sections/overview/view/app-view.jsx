// import { faker } from '@faker-js/faker';

import React, { useState } from 'react';
import { Excalidraw, exportToCanvas } from '@excalidraw/excalidraw';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  /* eslint-disable no-plusplus */
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export default function AppView() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // const [name, setName] = useState('');
  // const [birth, setBirth] = useState('');
  // const [sex, setSex] = useState('');
  // const [address, setAddress] = useState('');
  // const [room, setRoom] = useState('');
  // const [bed, setBed] = useState('');
  // const [hos, setHos] = useState('');

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {/* <Grid container spacing={{ xs: 2, md: 4 }} direction="column">
          <TextField
            label="Họ và tên "
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <Grid>
            <TextField
              label="Ngày sinh "
              name="birth"
              value={birth}
              onChange={(event) => {
                setBirth(event.target.value);
              }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Giới tính"
              name="3"
              value={sex}
              onChange={(event) => {
                setSex(event.target.value);
              }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Địa chỉ"
              name="4"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Phòng Phẫu thật"
              name="5"
              value={room}
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Giường"
              name="6"
              value={bed}
              onChange={(event) => {
                setBed(event.target.value);
              }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Vào viện"
              name="item7"
              value={hos}
              onChange={(event) => {
                setHos(event.target.value);
              }}
            />
          </Grid>
        </Grid> */}
        <Grid xs={12} md={6} lg={4}>
          <Button
            onClick={async () => {
              if (!excalidrawAPI) {
                return;
              }
              const elements = excalidrawAPI.getSceneElements();
              if (!elements || !elements.length) {
                return;
              }
              const canvas = await exportToCanvas({
                elements,
                appState: {
                  exportWithDarkMode: false,
                },
                files: excalidrawAPI.getFiles(),
                getDimensions: () => ({ width: 500, height: 500 }),
              });
              const base64Data = canvas.toDataURL().split(',')[1];
              const arrayBuffer = base64ToArrayBuffer(base64Data);
              const file = new File([arrayBuffer], 'test.png', {
                type: 'image/png',
              });

              const formData = new FormData();
              formData.append('file', file);

              /* eslint-disable prefer-template */
              // await fetch(
              //   'http://localhost:3000/?name=' +
              //     name +
              //     '&hospital=' +
              //     hos +
              //     '&bed=' +
              //     bed +
              //     '&address=' +
              //     address +
              //     '&birthday=' +
              //     birth +
              //     '&sex=' +
              //     sex,
              //   {
              //     method: 'POST',
              //     body: formData,
              //   }
              // )
              //   .then((response) => {
              //     if (response.ok) {
              //       return response.blob();
              //     }
              //     throw new Error(`File download failed with status code: ${response.status}`);
              //   })
              //   .then((blob) => {
              //     const fileUrl = URL.createObjectURL(blob);
              //     const link = document.createElement('a');
              //     link.href = fileUrl;
              //     link.download = 'downloaded_file.pdf'; // Set the desired file name with .pdf extension
              //     document.body.appendChild(link);
              //     link.click();
              //     document.body.removeChild(link);
              //     URL.revokeObjectURL(fileUrl);
              //   })
              //   .catch((error) => {
              //     console.error('Error:', error);
              //   });
            }}
          >
            Export
          </Button>

          <div style={{ height: '700px', width: '1000px' }}>
            <Excalidraw excalidrawAPI={(api) => setExcalidrawAPI(api)} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
