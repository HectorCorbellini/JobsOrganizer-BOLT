import Sidebar, { MenuItem } from './Sidebar';

interface MainLayoutProps {
  menuItems: MenuItem[];
  onImportSuccess: () => void;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ menuItems, onImportSuccess, children }) => {
  return (
    <div className="min-h-screen bg-bg-primary flex">
      <Sidebar menuItems={menuItems} onImportSuccess={onImportSuccess} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
