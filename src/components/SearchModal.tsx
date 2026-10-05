import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { EXTENDED_MENU } from '../data/cafeData';
import { ProductItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem
}) => {
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'cake' | 'coffee'>('all');

  const filteredItems = useMemo(() => {
    return EXTENDED_MENU.filter((item) => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.tagline.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, filterCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A2F23]/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#F8F5EE] rounded-[28px] overflow-hidden shadow-2xl border border-[#1A2F23]/10 z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1A2F23]/10 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#556259] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search pistachio bliss, Spanish latte, cheesecake..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#1A2F23] placeholder:text-[#8D9990] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8D9990] hover:text-[#1A2F23]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#556259] hover:text-[#1A2F23] px-2 py-1"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-3 bg-[#F8F5EE] border-b border-[#1A2F23]/5 flex items-center gap-2 text-xs">
          <span className="text-[#7B887E]">Filter:</span>
          {(['all', 'cake', 'coffee'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer capitalize ${
                filterCategory === cat
                  ? 'bg-[#1A2F23] text-white'
                  : 'bg-white text-[#556259] hover:text-[#1A2F23]'
              }`}
            >
              {cat === 'all' ? 'All Treats' : cat === 'cake' ? 'Patisserie' : 'Coffee'}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#7B887E]">
              No artisanal items matching "{query}"
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#EFE8DC]/50 border border-black/[0.04] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif-display text-sm font-semibold text-[#1A2F23] group-hover:text-[#C38B52] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#7B887E]">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#1A2F23] font-mono tabular-nums">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#1A2F23]/5 group-hover:bg-[#1A2F23] text-[#1A2F23] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
