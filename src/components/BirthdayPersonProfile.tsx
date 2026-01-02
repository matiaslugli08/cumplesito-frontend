/**
 * Birthday Person Profile Component
 * Displays AI-generated profile of the birthday person based on their wishlist
 */
import { Sparkles, User } from 'lucide-react';

interface BirthdayPersonProfileProps {
  profile: string;
  ownerName: string;
}

export default function BirthdayPersonProfile({ profile, ownerName }: BirthdayPersonProfileProps) {
  if (!profile || profile.trim() === '') {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-50 rounded-2xl p-6 shadow-lg border-2 border-purple-200 mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full">
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Conoce a {ownerName}
            <Sparkles className="w-5 h-5 text-purple-600" />
          </h2>
          <p className="text-sm text-gray-600">Perfil generado con IA</p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-purple-100">
        <div className="prose prose-sm max-w-none">
          {profile.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                {paragraph}
              </p>
            )
          ))}
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <Sparkles className="w-3 h-3" />
        <span>Este perfil ayuda a elegir el regalo perfecto</span>
        <Sparkles className="w-3 h-3" />
      </div>
    </div>
  );
}
