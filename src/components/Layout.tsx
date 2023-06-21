import '../App.css'

type LayoutProps = {
  card: React.ComponentType;
};

const Layout: React.FC<LayoutProps> = ({ card: Card }) => {
  return (
    <div>
      <Card />
    </div>
  );
};

export default Layout;