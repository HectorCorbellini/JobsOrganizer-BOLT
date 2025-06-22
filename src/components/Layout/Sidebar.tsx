import { Briefcase, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ImportJobs } from './ImportJobs';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  route: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  onImportSuccess: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onImportSuccess }) => {
  return (
    <div className="w-64 bg-bg-secondary shadow-lg border-r border-border-primary flex flex-col">
      <div className="p-6 border-b border-border-primary">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">JobTracker</h1>
            <p className="text-sm text-text-secondary">Application Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="p-4 border-t border-border-primary">
          <ImportJobs onImportSuccess={onImportSuccess} />
        </div>
        <div className="p-4 border-t border-border-primary">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-left text-text-secondary rounded-md hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
