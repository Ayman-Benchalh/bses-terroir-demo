'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Search, Check, AlertCircle } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Product, ProductUnit } from '@/lib/types';
import { CATEGORIES_SEED } from '@/data/categories.seed';
import { formatCurrencyMAD } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export function AdminProducts() {
  const { locale, t } = useLocale();
  const { state, addProduct, updateProduct, deleteProduct, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nameFr: '',
    nameEn: '',
    nameAr: '',
    descriptionFr: '',
    sku: '',
    category: 'fruits-frais',
    pricePerUnit: 20,
    baseUnit: 'kg' as ProductUnit,
    pricingUnit: 'kg',
    unitStep: 1,
    minQuantity: 1,
    maxQuantity: 50,
    stockQuantity: 25,
    isPromo: false,
    promoPrice: 0,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    originFr: 'Région du Maroc',
  });

  const handleOpenAdd = () => {
    setFormData({
      nameFr: '',
      nameEn: '',
      nameAr: '',
      descriptionFr: '',
      sku: `TER-CUSTOM-${Math.floor(100 + Math.random() * 900)}`,
      category: 'fruits-frais',
      pricePerUnit: 25,
      baseUnit: 'kg',
      pricingUnit: 'kg',
      unitStep: 1,
      minQuantity: 1,
      maxQuantity: 50,
      stockQuantity: 30,
      isPromo: false,
      promoPrice: 0,
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
      originFr: 'Coopérative Locale',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      nameFr: product.name.fr,
      nameEn: product.name.en,
      nameAr: product.name.ar,
      descriptionFr: product.description.fr,
      sku: product.sku,
      category: product.category,
      pricePerUnit: product.pricePerUnit,
      baseUnit: product.baseUnit,
      pricingUnit: product.pricingUnit,
      unitStep: product.unitStep || 1,
      minQuantity: product.minQuantity || 1,
      maxQuantity: product.maxQuantity || 50,
      stockQuantity: product.stockQuantity,
      isPromo: product.isPromo,
      promoPrice: product.promoPrice || 0,
      image: product.image,
      originFr: product.originRegion.fr,
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameFr.trim()) {
      showToast('Le nom du produit est obligatoire.', 'error');
      return;
    }

    const newProd: Omit<Product, 'id'> = {
      slug: formData.nameFr.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: formData.sku,
      name: {
        fr: formData.nameFr,
        en: formData.nameEn || formData.nameFr,
        ar: formData.nameAr || formData.nameFr,
      },
      description: {
        fr: formData.descriptionFr || formData.nameFr,
        en: formData.nameEn || formData.nameFr,
        ar: formData.nameAr || formData.nameFr,
      },
      category: formData.category,
      pricePerUnit: Number(formData.pricePerUnit),
      baseUnit: formData.baseUnit,
      pricingUnit: formData.pricingUnit,
      unitStep: Number(formData.unitStep),
      minQuantity: Number(formData.minQuantity),
      maxQuantity: Number(formData.maxQuantity),
      stockQuantity: Number(formData.stockQuantity),
      inStock: Number(formData.stockQuantity) > 0,
      isPromo: formData.isPromo,
      promoPrice: formData.isPromo ? Number(formData.promoPrice) : undefined,
      originRegion: {
        fr: formData.originFr,
        en: formData.originFr,
        ar: formData.originFr,
      },
      storageAdvice: {
        fr: 'Conserver au frais et au sec.',
        en: 'Store cool and dry.',
        ar: 'يحفظ في مكان بارد وجاف.',
      },
      tags: ['Nouveauté', 'Terroir'],
      image: formData.image,
      rating: 5.0,
      reviewsCount: 1,
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: {
        fr: formData.nameFr,
        en: formData.nameEn || formData.nameFr,
        ar: formData.nameAr || formData.nameFr,
      },
      description: {
        ...editingProduct.description,
        fr: formData.descriptionFr,
      },
      category: formData.category,
      pricePerUnit: Number(formData.pricePerUnit),
      pricingUnit: formData.pricingUnit,
      stockQuantity: Number(formData.stockQuantity),
      inStock: Number(formData.stockQuantity) > 0,
      isPromo: formData.isPromo,
      promoPrice: formData.isPromo ? Number(formData.promoPrice) : undefined,
      image: formData.image,
    });

    setEditingProduct(null);
  };

  const filteredProducts = state.products.filter((p) => {
    const matchesSearch =
      p.name[locale].toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat ? p.category === selectedCat : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 text-start">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher nom, SKU..."
              className="w-full h-10 ps-9 pe-3 rounded-xl border border-[#E8E1CF] text-xs focus:outline-none focus:border-[#315B3C]"
            />
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D6855]" />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#E8E1CF] text-xs bg-white text-[#282E23] focus:outline-none"
          >
            <option value="">Toutes les catégories</option>
            {CATEGORIES_SEED.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name[locale]}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#315B3C] text-white text-xs font-semibold hover:bg-[#264930] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t('admin.actions.add_product')}</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="p-4 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-start">
          <thead>
            <tr className="border-b border-[#E8E1CF] text-[#5D6855]">
              <th className="py-3 px-3 text-start">Produit</th>
              <th className="py-3 px-3 text-start">SKU</th>
              <th className="py-3 px-3 text-start">Catégorie</th>
              <th className="py-3 px-3 text-start">Prix Unitaire</th>
              <th className="py-3 px-3 text-start">Stock</th>
              <th className="py-3 px-3 text-start">État</th>
              <th className="py-3 px-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E1CF]">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-[#F5F0DF]/40 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0DF] shrink-0 border border-[#E8E1CF]">
                      <Image
                        src={product.image}
                        alt={product.name[locale]}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-[#282E23] line-clamp-1 max-w-xs">
                      {product.name[locale]}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 font-mono text-[#5D6855]">{product.sku}</td>
                <td className="py-3 px-3 text-[#5D6855]">{product.category}</td>
                <td className="py-3 px-3 font-bold text-[#315B3C]">
                  {formatCurrencyMAD(product.pricePerUnit, locale)} / {product.pricingUnit}
                  {product.isPromo && (
                    <span className="block text-[10px] text-[#D97706]">
                      Promo: {product.promoPrice} MAD
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 font-semibold text-[#282E23]">
                  {product.stockQuantity} {product.pricingUnit}
                </td>
                <td className="py-3 px-3">
                  {product.inStock ? (
                    <Badge variant={product.stockQuantity <= 5 ? 'warning' : 'success'} size="sm">
                      {product.stockQuantity <= 5 ? 'Stock faible' : 'En stock'}
                    </Badge>
                  ) : (
                    <Badge variant="error" size="sm">
                      Rupture
                    </Badge>
                  )}
                </td>
                <td className="py-3 px-3 text-end space-x-1">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="p-1.5 text-[#315B3C] hover:bg-[#315B3C]/10 rounded-lg transition-colors cursor-pointer"
                    aria-label="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Supprimer le produit "${product.name[locale]}" ?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="p-1.5 text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg transition-colors cursor-pointer"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un nouveau produit"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Nom (Français)"
              required
              value={formData.nameFr}
              onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
            />
            <Input
              label="Nom (English)"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Nom (العربية)"
              value={formData.nameAr}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
            />
            <Input
              label="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#282E23] mb-1">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-[#E8E1CF] text-xs bg-white text-[#282E23]"
              >
                {CATEGORIES_SEED.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name[locale]}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Prix unitaire (MAD)"
              type="number"
              min={1}
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
            />
            <Input
              label="Unité (ex: kg, pièce)"
              value={formData.pricingUnit}
              onChange={(e) => setFormData({ ...formData, pricingUnit: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Stock disponible"
              type="number"
              min={0}
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
            />
            <Input
              label="URL Image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="addPromo"
              checked={formData.isPromo}
              onChange={(e) => setFormData({ ...formData, isPromo: e.target.checked })}
              className="w-4 h-4 rounded text-[#315B3C]"
            />
            <label htmlFor="addPromo" className="text-xs font-semibold text-[#282E23]">
              Activer une promotion
            </label>
            {formData.isPromo && (
              <input
                type="number"
                placeholder="Prix promo"
                value={formData.promoPrice}
                onChange={(e) => setFormData({ ...formData, promoPrice: Number(e.target.value) })}
                className="w-28 h-8 px-2 text-xs rounded border border-[#E8E1CF]"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1CF]">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-black/5"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#315B3C] text-white text-xs font-semibold rounded-xl hover:bg-[#264930]"
            >
              Créer le produit
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={Boolean(editingProduct)}
        onClose={() => setEditingProduct(null)}
        title={`Modifier : ${editingProduct?.name.fr}`}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <Input
            label="Nom (Français)"
            required
            value={formData.nameFr}
            onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Prix unitaire (MAD)"
              type="number"
              min={1}
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
            />
            <Input
              label="Stock disponible"
              type="number"
              min={0}
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="editPromo"
              checked={formData.isPromo}
              onChange={(e) => setFormData({ ...formData, isPromo: e.target.checked })}
              className="w-4 h-4 rounded text-[#315B3C]"
            />
            <label htmlFor="editPromo" className="text-xs font-semibold text-[#282E23]">
              Activer une promotion
            </label>
            {formData.isPromo && (
              <input
                type="number"
                placeholder="Prix promo"
                value={formData.promoPrice}
                onChange={(e) => setFormData({ ...formData, promoPrice: Number(e.target.value) })}
                className="w-28 h-8 px-2 text-xs rounded border border-[#E8E1CF]"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1CF]">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-black/5"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#315B3C] text-white text-xs font-semibold rounded-xl hover:bg-[#264930]"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
