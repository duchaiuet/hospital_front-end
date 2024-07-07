import { Helmet } from 'react-helmet-async';

import DocumentList from 'src/sections/document/documentList';

// ----------------------------------------------------------------------

export default function DocumentPage() {
  return (
    <>
      <Helmet>
        <title> Document List</title>
      </Helmet>

      <DocumentList />
    </>
  );
}
