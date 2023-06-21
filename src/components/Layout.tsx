import '../App.css'

type LayoutProps = {
  card: React.ComponentType;
  name: string;
};

const Layout: React.FC<LayoutProps> = ({ card: Card, name }) => {
  return (
    <div>
      <h2>Hello {name}</h2>
      <Card />
    </div>
  );
};

export default Layout;