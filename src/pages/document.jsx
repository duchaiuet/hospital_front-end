import { Helmet } from 'react-helmet-async';

import DocumentForm from 'src/sections/document/documentForm';

// ----------------------------------------------------------------------

export default function DocumentPage() {
  return (
    <>
      <Helmet>
        <title> Document</title>
      </Helmet>

      <DocumentForm />
    </>
  );
}
