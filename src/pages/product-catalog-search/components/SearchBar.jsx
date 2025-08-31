import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const popularSearches = [
    "Solar panels 400W",
    "Tesla Powerwall",
    "String inverters",
    "Lithium batteries",
    "Monocrystalline panels"
  ];

  const recentSearches = [
    "LG solar panels",
    "Enphase micro inverters",
    "Battery storage systems"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);
    
    if (value?.length > 0) {
      // Mock autocomplete suggestions
      const mockSuggestions = [
        `${value} panels`,
        `${value} inverters`,
        `${value} batteries`,
        `${value} systems`
      ]?.filter(suggestion => 
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for solar panels, batteries, inverters..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-12"
        />
        <Icon
          name="Search"
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <button
          onClick={() => onSearch(searchQuery)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-smooth"
        >
          <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
        </button>
      </div>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-modal z-50 max-h-96 overflow-y-auto">
          {suggestions?.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1">Suggestions</div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-smooth flex items-center space-x-2"
                >
                  <Icon name="Search" size={14} className="text-muted-foreground" />
                  <span className="text-sm">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {searchQuery?.length === 0 && (
            <>
              {recentSearches?.length > 0 && (
                <div className="p-2 border-b border-border">
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1">Recent Searches</div>
                  {recentSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground px-2 py-1">Popular Searches</div>
                {popularSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;