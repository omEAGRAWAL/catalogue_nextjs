import Nav from "../component/Nav";
import CreateCatalogueForm from "../component/CreateCatalogue";
export default function home() {
  return (
    <div>
      <Nav />
      <CreateCatalogueForm />
    </div>
  );
}

// if(logedin){
//   console.log("welcome home")
// }
// else{
//   console.log("plese log in")
// }
