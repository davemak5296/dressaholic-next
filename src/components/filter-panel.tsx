import * as React from 'react';

type FilterPanelProps = {
  title: string;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ title }: { title: string }) => {
  return (
    <div className="daisy-collapse daisy-collapse-arrow border-b border-base-300 bg-base-100">
      <input type="checkbox" />
      <div className="daisy-collapse-title text-base">{title}</div>
      <div className="daisy-collapse-content text-sm font-light">
        <p>Lorem, ipsum.</p>
      </div>
    </div>
  );
};

export default FilterPanel;
