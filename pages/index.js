import Head from "next/head";

import Nav from "./component/Nav";
import Catalogue from "./component/Catalogue";
import CreateCatalogueForm from "./component/CreateCatalogue";

export default function Home() {
  return (
    <div>
      <Nav />
      <CreateCatalogueForm />

      <Catalogue />
    </div>
  );
}
