import { FileText, MessageCircle, Lightbulb, ExternalLink, Calendar, Mail } from 'lucide-react';
import { Job } from '../domain/models/Job';
import { useSuggestions } from '../application/hooks/useSuggestions';

interface SuggestionsProps {
  job: Job;
}

const Suggestions: React.FC<SuggestionsProps> = ({ job }) => {

  const { cvSuggestions, applicationStrategies, linkedinSuggestions, followUpTips } = useSuggestions(job);

  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg border border-border-primary p-6 space-y-6">
      <h2 className="text-xl font-bold text-text-primary mb-4">Application Suggestions</h2>

      {/* CV Customization */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">CV Customization</h3>
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <ul className="space-y-2">
            {cvSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-text-secondary">{suggestion}</span>
              </li>
            ))}
          </ul>
          <button className="mt-3 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors text-sm">
            Generate Custom CV
          </button>
        </div>
      </div>

      {/* Application Strategy */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-text-primary">Application Strategy</h3>
        </div>
        <div className="space-y-3">
          {applicationStrategies.map((strategy, index) => (
            <div key={index} className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">{strategy.method}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  strategy.priority === 'high' ? 'bg-red-900/50 text-red-300' : 'bg-yellow-900/50 text-yellow-300'
                }`}>
                  {strategy.priority} priority
                </span>
              </div>
              <p className="text-sm text-text-secondary">{strategy.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Content */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-text-primary">LinkedIn Content Ideas</h3>
        </div>
        <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
          <p className="text-sm text-text-secondary mb-3">
            Boost your visibility with relevant content before applying:
          </p>
          <ul className="space-y-2">
            {linkedinSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-text-secondary">{suggestion}</span>
              </li>
            ))}
          </ul>
          <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
            <ExternalLink className="w-4 h-4 inline mr-1" />
            Open LinkedIn
          </button>
        </div>
      </div>

      {/* Follow-up Tips */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-text-primary">Follow-up Strategy</h3>
        </div>
        <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4">
          <ul className="space-y-2">
            {followUpTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-text-secondary">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-3 pt-4 border-t border-border-primary">
        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          <Mail className="w-4 h-4" />
          <span>Draft Email</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors">
          <Calendar className="w-4 h-4" />
          <span>Set Reminders</span>
        </button>
      </div>
    </div>
  );
};

export default Suggestions;