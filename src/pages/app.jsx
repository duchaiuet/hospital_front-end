import { Helmet } from 'react-helmet-async';

// import { AppView } from 'src/sections/overview/view';
import DocumentForm from 'src/sections/document/form';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      {/* <AppView /> */}
      <DocumentForm />
    </>
  );
}
