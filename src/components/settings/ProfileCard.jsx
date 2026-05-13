import { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { HiOutlineUser, HiOutlineCamera, HiOutlineTrash } from 'react-icons/hi2';

export default function ProfileCard() {
  const { userProfile, updateUserProfile } = useApp();
  const fileRef = useRef(null);
  const initials = (userProfile?.name || 'U').charAt(0).toUpperCase();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => updateUserProfile({ avatar: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    updateUserProfile({ avatar: null });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="relative group flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-indigo-200/50 dark:shadow-indigo-800/30 overflow-hidden">
            {userProfile?.avatar ? (
              <img src={userProfile.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
            <button
              onClick={() => fileRef.current?.click()}
              className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
              title="Upload photo"
            >
              <HiOutlineCamera className="w-4 h-4" />
            </button>
            {userProfile?.avatar && (
              <button
                onClick={handleRemoveImage}
                className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
                title="Remove photo"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="flex-1 w-full space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 dark:text-slate-400">Name</label>
            <input
              type="text"
              value={userProfile?.name || ''}
              onChange={(e) => updateUserProfile({ name: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 dark:text-slate-400">Email</label>
            <input
              type="email"
              value={userProfile?.email || ''}
              onChange={(e) => updateUserProfile({ email: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 transition-all dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              placeholder="your@email.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
