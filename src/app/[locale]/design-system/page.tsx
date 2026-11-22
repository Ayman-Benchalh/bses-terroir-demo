'use client';

import React, { useState } from 'react';
import {
  Palette,
  Type,
  LayoutGrid,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Modal } from '@/components/ui/Modal';
import { useLocale } from '@/context/LocaleContext';

export default function DesignSystemPage() {
  const { locale, t } = useLocale();

  const [stepperVal, setStepperVal] = useState<number>(1.5);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const colors = [
    { name: 'Forest Green', hex: '#315B3C', text: '#FFFFFF', desc: 'Couleur primaire noble, feuillage & vergers' },
    { name: 'Cream', hex: '#F5F0DF', text: '#282E23', desc: 'Fond chaleureux & surfaces naturelles' },
    { name: 'Honey', hex: '#E7A84C', text: '#282E23', desc: 'Accentuation lumineuse, miels & soleil' },
    { name: 'Pale Sage', hex: '#DDE7C8', text: '#282E23', desc: 'Teinte secondaire végétale & badges' },
    { name: 'Dark Earth', hex: '#282E23', text: '#FFFFFF', desc: 'Contraste d’ancrage, texte & bordures profondes' },
    { name: 'Off-white', hex: '#FFFCF5', text: '#282E23', desc: 'Fond principal épuré et lumineux' },
  ];

  const spacingScale = [
    { px: 4, token: 'space-1' },
    { px: 8, token: 'space-2' },
    { px: 12, token: 'space-3' },
    { px: 16, token: 'space-4' },
    { px: 20, token: 'space-5' },
    { px: 24, token: 'space-6' },
    { px: 32, token: 'space-8' },
    { px: 40, token: 'space-10' },
    { px: 48, token: 'space-12 (Touch Target M3)' },
    { px: 64, token: 'space-16' },
    { px: 80, token: 'space-20' },
    { px: 96, token: 'space-24' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 text-start">
      {/* Title */}
      <div className="border-b border-[#E8E1CF] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315B3C]/10 text-[#315B3C] text-xs font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>Material Design 3 & Moroccan Identity</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#282E23]">
          TERROIR Design System
        </h1>
        <p className="text-sm sm:text-base text-[#5D6855] max-w-2xl">
          Système de composants unifié, tokens de mesure Material Design 3, contraste accessible et ergonomie tactile 48px pour l’e-commerce alimentaire de prestige.
        </p>
      </div>

      {/* 1. Palette Couleurs */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#315B3C]" />
          <h2 className="font-heading text-2xl font-bold text-[#282E23]">
            1. Palette Chromatique
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colors.map((c) => (
            <div
              key={c.name}
              className="p-5 rounded-2xl border border-[#E8E1CF] shadow-xs space-y-3"
              style={{ backgroundColor: c.hex, color: c.text }}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-lg">{c.name}</span>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-black/10">
                  {c.hex}
                </span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Échelle de Mesure & Spacing Material 3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#315B3C]" />
          <h2 className="font-heading text-2xl font-bold text-[#282E23]">
            2. Échelle de Rythme & Mesures Material 3
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-4">
          <p className="text-xs text-[#5D6855]">
            Norme stricte : les cibles tactiles critiques (boutons, tiroir hamburger, sélecteurs d’incrément) respectent le minimum de <strong>48 × 48 px</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {spacingScale.map((s) => (
              <div
                key={s.px}
                className="p-3 rounded-xl border border-[#E8E1CF] bg-[#F5F0DF]/40 flex items-center justify-between text-xs"
              >
                <span className="font-mono font-bold text-[#315B3C]">{s.px}px</span>
                <span className="text-[#5D6855] text-[11px]">{s.token}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Typographie */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-[#315B3C]" />
          <h2 className="font-heading text-2xl font-bold text-[#282E23]">
            3. Typographie & Contrastes
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#5D6855] uppercase tracking-wider block">
              Display Serif (Titres éditoriaux)
            </span>
            <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
              Le meilleur de nos terres, chez vous.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#E8E1CF]">
            <span className="text-xs font-bold text-[#5D6855] uppercase tracking-wider block">
              Sans-Serif Moderne (Interface, boutons & données)
            </span>
            <p className="text-base text-[#282E23] leading-relaxed">
              Oranges douces particulièrement juteuses, cueillies à la main dans les vergers ensoleillés de la plaine des Triffa à Berkane.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#E8E1CF]" dir="rtl">
            <span className="text-xs font-bold text-[#5D6855] uppercase tracking-wider block">
              Typographie Arabe (RTL harmonieux)
            </span>
            <p className="text-xl font-bold text-[#282E23] leading-relaxed">
              أجود ما جادت به أرض المغرب، طازجاً من التعاونيات إلى بيوتكم.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Boutons & États Interactifs */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-[#315B3C]" />
          <h2 className="font-heading text-2xl font-bold text-[#282E23]">
            4. Composants Boutons
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Bouton Principal</Button>
            <Button variant="honey">Bouton Honey</Button>
            <Button variant="secondary">Bouton Secondaire</Button>
            <Button variant="outline">Bouton Contour</Button>
            <Button variant="ghost">Bouton Ghost</Button>
            <Button variant="danger">Bouton Alerte</Button>
            <Button variant="primary" isLoading>
              Chargement...
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E8E1CF]">
            <span className="text-xs text-[#5D6855] font-semibold w-full">Tailles standardisées :</span>
            <Button size="sm">Petit (36px)</Button>
            <Button size="md">Moyen (44px)</Button>
            <Button size="lg">Grand Tactile (48px M3)</Button>
          </div>
        </div>
      </section>

      {/* 5. Badges Sémantiques */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl font-bold text-[#282E23]">
          5. Badges & Puces Sémantiques
        </h2>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs flex flex-wrap items-center gap-3">
          <Badge variant="default">Terroir Défaut</Badge>
          <Badge variant="success">En Stock (Optimal)</Badge>
          <Badge variant="warning">Stock Limité</Badge>
          <Badge variant="error">Rupture de Stock</Badge>
          <Badge variant="honey">Prestige Terroir</Badge>
          <Badge variant="sage">Bio-Raisonné</Badge>
          <Badge variant="outline">Origine Régionale</Badge>
        </div>
      </section>

      {/* 6. Stepper de Quantité Frais au Demi-Kilo */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl font-bold text-[#282E23]">
          6. Sélecteur de Quantité Déterministe
        </h2>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-4">
          <p className="text-xs text-[#5D6855]">
            Permet la commande au pas de 0.5 kg sans dérive de virgule flottante.
          </p>

          <div className="flex items-center gap-4">
            <QuantityStepper
              size="lg"
              value={stepperVal}
              step={0.5}
              min={0.5}
              max={10}
              unit="kg"
              onChange={(v) => setStepperVal(v)}
            />
            <span className="text-xs font-semibold text-[#315B3C]">
              Valeur exacte transmise : {stepperVal} kg
            </span>
          </div>
        </div>
      </section>

      {/* 7. Champs de Saisie Accessible */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl font-bold text-[#282E23]">
          7. Champs de Formulaire
        </h2>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Champ Standard" placeholder="Entrez une valeur..." />
          <Input
            label="Champ avec Erreur de Validation"
            error="Ce champ est obligatoire selon la norme."
            defaultValue="Valeur incorrecte"
          />
        </div>
      </section>

      {/* 8. Dialogue Modal Test */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl font-bold text-[#282E23]">
          8. Modale & Focus Trap
        </h2>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs">
          <Button onClick={() => setIsSampleModalOpen(true)}>
            Ouvrir la modale de démonstration
          </Button>

          <Modal
            isOpen={isSampleModalOpen}
            onClose={() => setIsSampleModalOpen(false)}
            title="Démonstration Composant Modal"
            description="Focus trap, blocage de défilement d'arrière-plan et fermeture Échap."
          >
            <div className="space-y-4 pt-2">
              <p className="text-xs text-[#5D6855] leading-relaxed">
                Ce dialogue vérifie les critères d’accessibilité WCAG 2.2 AA : focus automatique, navigation au clavier et contraste vérifié.
              </p>
              <div className="flex justify-end pt-2">
                <Button onClick={() => setIsSampleModalOpen(false)}>Fermer</Button>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
}
