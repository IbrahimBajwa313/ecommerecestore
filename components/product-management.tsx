"use client"

import React from "react"

import type { ReactElement } from "react"
import { useState, useEffect, useCallback } from "react"
import { Plus, Search, Edit, Trash2, Eye, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: {
    _id: string
    name: string
  }
  images: string[]
  stock: number
  sku: string
  status: string
  features: string[]
  tags: string[]
}

interface Category {
  _id: string
  name: string
  slug: string
}

interface ProductFormData {
  name: string
  description: string
  price: string
  originalPrice: string
  category: string
  stock: string
  sku: string
  status: string
  features: string
  tags: string
  images: string[]
}

const ProductForm = React.memo<{
  formData: ProductFormData
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
  categories: Category[]
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  uploadingImages: boolean
  onImageUpload: (files: FileList | null) => void
  onRemoveImage: (index: number) => void
  onCancel: () => void
  isEdit?: boolean
}>(
  ({
    formData,
    setFormData,
    categories,
    onSubmit,
    isSubmitting,
    uploadingImages,
    onImageUpload,
    onRemoveImage,
    onCancel,
    isEdit = false,
  }) => {
    const handleInputChange = useCallback(
      (field: keyof ProductFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      },
      [setFormData],
    )

    const handleSelectChange = useCallback(
      (field: keyof ProductFormData) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
      },
      [setFormData],
    )

    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${isEdit ? "edit-" : ""}name`}>Product Name</Label>
            <Input
              id={`${isEdit ? "edit-" : ""}name`}
              value={formData.name}
              onChange={handleInputChange("name")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEdit ? "edit-" : ""}sku`}>SKU</Label>
            <Input
              id={`${isEdit ? "edit-" : ""}sku`}
              value={formData.sku}
              onChange={handleInputChange("sku")}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${isEdit ? "edit-" : ""}description`}>Description</Label>
          <Textarea
            id={`${isEdit ? "edit-" : ""}description`}
            value={formData.description}
            onChange={handleInputChange("description")}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${isEdit ? "edit-" : ""}price`}>Price ($)</Label>
            <Input
              id={`${isEdit ? "edit-" : ""}price`}
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange("price")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEdit ? "edit-" : ""}originalPrice`}>Original Price ($)</Label>
            <Input
              id={`${isEdit ? "edit-" : ""}originalPrice`}
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={handleInputChange("originalPrice")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEdit ? "edit-" : ""}stock`}>Stock</Label>
            <Input
              id={`${isEdit ? "edit-" : ""}stock`}
              type="number"
              value={formData.stock}
              onChange={handleInputChange("stock")}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${isEdit ? "edit-" : ""}category`}>Category</Label>
            <Select value={formData.category} onValueChange={handleSelectChange("category")}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${isEdit ? "edit-" : ""}status`}>Status</Label>
            <Select value={formData.status} onValueChange={handleSelectChange("status")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label>Product Images</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <Label htmlFor={`${isEdit ? "edit-" : ""}images`} className="cursor-pointer">
                  <span className="text-sm text-blue-600 hover:text-blue-500">Click to upload images</span>
                  <Input
                    id={`${isEdit ? "edit-" : ""}images`}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onImageUpload(e.target.files)}
                    disabled={uploadingImages}
                  />
                </Label>
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB each</p>
            </div>
          </div>

          {/* Image Preview */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onRemoveImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {uploadingImages && <div className="text-center text-sm text-gray-500">Uploading images...</div>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${isEdit ? "edit-" : ""}features`}>Features (comma-separated)</Label>
          <Textarea
            id={`${isEdit ? "edit-" : ""}features`}
            value={formData.features}
            onChange={handleInputChange("features")}
            placeholder="Feature 1, Feature 2, Feature 3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${isEdit ? "edit-" : ""}tags`}>Tags (comma-separated)</Label>
          <Input
            id={`${isEdit ? "edit-" : ""}tags`}
            value={formData.tags}
            onChange={handleInputChange("tags")}
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || uploadingImages}>
            {isSubmitting ? (isEdit ? "Updating..." : "Adding...") : isEdit ? "Update Product" : "Add Product"}
          </Button>
        </DialogFooter>
      </form>
    )
  },
)

ProductForm.displayName = "ProductForm"

export function ProductManagement(): ReactElement {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    sku: "",
    status: "active",
    features: "",
    tags: "",
    images: [],
  })

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }, [])

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      stock: "",
      sku: "",
      status: "active",
      features: "",
      tags: "",
      images: [],
    })
  }, [])

  const handleImageUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return

      setUploadingImages(true)
      const uploadedUrls: string[] = []

      try {
        for (const file of Array.from(files)) {
          // Validate file type
          if (!file.type.startsWith("image/")) {
            toast({
              title: "Error",
              description: "Please select only image files",
              variant: "destructive",
            })
            continue
          }

          // Validate file size (5MB limit)
          if (file.size > 5 * 1024 * 1024) {
            toast({
              title: "Error",
              description: "Image size should be less than 5MB",
              variant: "destructive",
            })
            continue
          }

          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/upload-local", {
            method: "POST",
            body: formData,
          })

          if (response.ok) {
            const data = await response.json()
            uploadedUrls.push(data.url)
          } else {
            throw new Error("Failed to upload image")
          }
        }

        // Add uploaded URLs to form data
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }))

        toast({
          title: "Success",
          description: `${uploadedUrls.length} image(s) uploaded successfully`,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload images",
          variant: "destructive",
        })
      } finally {
        setUploadingImages(false)
      }
    },
    [toast],
  )

  const removeImage = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }, [])

  const handleAddProduct = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      try {
        const productData = {
          ...formData,
          price: Number.parseFloat(formData.price),
          originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
          stock: Number.parseInt(formData.stock),
          features: formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean),
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }

        const response = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Product added successfully",
          })
          setIsAddDialogOpen(false)
          resetForm()
          fetchProducts()
        } else {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to add product")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to add product",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, toast, resetForm, fetchProducts],
  )

  const handleEditProduct = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!selectedProduct) return

      setIsSubmitting(true)

      try {
        const productData = {
          ...formData,
          price: Number.parseFloat(formData.price),
          originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
          stock: Number.parseInt(formData.stock),
          features: formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean),
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }

        const response = await fetch(`/api/admin/products/${selectedProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Product updated successfully",
          })
          setIsEditDialogOpen(false)
          resetForm()
          setSelectedProduct(null)
          fetchProducts()
        } else {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to update product")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to update product",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, selectedProduct, toast, resetForm, fetchProducts],
  )

  const handleDeleteProduct = useCallback(
    async (productId: string) => {
      if (!confirm("Are you sure you want to delete this product?")) return

      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Product deleted successfully",
          })
          fetchProducts()
        } else {
          throw new Error("Failed to delete product")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        })
      }
    },
    [toast, fetchProducts],
  )

  const openEditDialog = useCallback((product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category._id,
      stock: product.stock.toString(),
      sku: product.sku,
      status: product.status,
      features: product.features.join(", "),
      tags: product.tags.join(", "),
      images: product.images,
    })
    setIsEditDialogOpen(true)
  }, [])

  const handleCancelAdd = useCallback(() => {
    setIsAddDialogOpen(false)
    resetForm()
  }, [resetForm])

  const handleCancelEdit = useCallback(() => {
    setIsEditDialogOpen(false)
    resetForm()
    setSelectedProduct(null)
  }, [resetForm])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="bg-gray-300 h-12 w-12 rounded"></div>
                <div className="bg-gray-300 h-4 w-32 rounded"></div>
                <div className="bg-gray-300 h-4 w-24 rounded"></div>
                <div className="bg-gray-300 h-4 w-16 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Management</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Create a new product for your store</DialogDescription>
                </DialogHeader>
                <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  categories={categories}
                  onSubmit={handleAddProduct}
                  isSubmitting={isSubmitting}
                  uploadingImages={uploadingImages}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={removeImage}
                  onCancel={handleCancelAdd}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.images[0] || "/placeholder.svg?height=50&width=50"}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${product.price}</div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "active"
                            ? "default"
                            : product.status === "inactive"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {product.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            onSubmit={handleEditProduct}
            isSubmitting={isSubmitting}
            uploadingImages={uploadingImages}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            onCancel={handleCancelEdit}
            isEdit={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
