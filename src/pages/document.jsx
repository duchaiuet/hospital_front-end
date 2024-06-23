import { Helmet } from 'react-helmet-async';

import DocumentForm from 'src/sections/document/form';

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
