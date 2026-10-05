import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    date: '2026-10-06',
    time: '16:00',
    guests: 2,
    seatingArea: 'conservatory',
    notes: ''
  });
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A2F23]/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#F8F5EE] rounded-[32px] overflow-hidden shadow-2xl border border-[#1A2F23]/10 z-10 p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#556259] hover:text-[#1A2F23]"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#44634E]/10 text-[#44634E] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#1A2F23]">
              Reservation Confirmed
            </h3>
            <p className="text-xs text-[#556259] max-w-sm mx-auto leading-relaxed">
              We look forward to welcoming you, <span className="font-semibold text-[#1A2F23]">{formData.name}</span>, for {formData.guests} guests on {formData.date} at {formData.time} in our {formData.seatingArea === 'conservatory' ? 'Indoor European Conservatory' : formData.seatingArea === 'terrace' ? 'Garden Terrace' : 'Artisanal Espresso Bar'}.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setConfirmed(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#1A2F23] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="font-script-accent text-3xl text-[#C38B52] mb-1">
                Warm Hospitality
              </p>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A2F23]">
                Reserve a Table &amp; High Tea
              </h2>
              <p className="text-xs text-[#556259] mt-1">
                Experience Ella's European ambiance and freshly plated cakes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2F23] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Fatima Ali"
                    className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-3 py-2 text-xs text-[#1A2F23] focus:outline-none focus:border-[#1A2F23]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2F23] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 321 9876543"
                    className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-3 py-2 text-xs text-[#1A2F23] focus:outline-none focus:border-[#1A2F23]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2F23] mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-3 py-2 text-xs text-[#1A2F23] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2F23] mb-1">
                    Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-2 py-2 text-xs text-[#1A2F23] focus:outline-none"
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="15:30">3:30 PM (High Tea)</option>
                    <option value="17:00">5:00 PM (High Tea)</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2F23] mb-1">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-2 py-2 text-xs text-[#1A2F23] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2F23] mb-1.5">
                  Preferred Ambience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'conservatory', label: 'Conservatory' },
                    { id: 'terrace', label: 'Garden Terrace' },
                    { id: 'espresso-bar', label: 'Espresso Bar' }
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, seatingArea: area.id as any })}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-colors cursor-pointer ${
                        formData.seatingArea === area.id
                          ? 'bg-[#1A2F23] text-white border-[#1A2F23]'
                          : 'bg-white text-[#556259] border-[#1A2F23]/15 hover:border-[#1A2F23]'
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2F23] mb-1">
                  Special Occasion or Dietary Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Birthday celebration, nut allergy, outdoor quiet table..."
                  className="w-full bg-white border border-[#1A2F23]/15 rounded-xl px-3 py-2 text-xs text-[#1A2F23] focus:outline-none focus:border-[#1A2F23]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1A2F23] hover:bg-[#122219] text-white rounded-full text-xs font-semibold uppercase tracking-widest shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                Confirm Table Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
