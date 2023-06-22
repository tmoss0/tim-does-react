import '../App.css'

type LayoutProps = {
  card: React.ComponentType;
};

const Layout = ({ card: Card }: LayoutProps) => {
  return (
    <div>
      <Card />
    </div>
  );
};

export default Layout;