"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/lib/auth"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: "Material" | "Machine" | "Professionals"
}

export default function SellerDashboard() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "Material",
  })

  useEffect(() => {
    // Load products from local storage
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      // If no products in local storage, use default products
      const defaultProducts: Product[] = [
        {
          id: 1,
          name: "Cement",
          price: 350,
          image:
            "https://images.unsplash.com/photo-1560435650-7ec2e17ba926?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "High-quality cement for construction",
          category: "Material",
        },
        {
          id: 2,
          name: "Excavator",
          price: 150000,
          image:
            "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Heavy-duty excavator for construction sites",
          category: "Machine",
        },
        {
          id: 3,
          name: "Skilled Mason",
          price: 800,
          image:
            "https://plus.unsplash.com/premium_photo-1683140489519-d5e8d2c7aced?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Experienced mason for brickwork and stonework",
          category: "Professionals",
        },
        {
          id: 4,
          name: "Steel",
          price: 500,
          image:
            "https://images.unsplash.com/photo-1582540730843-f4418d96ccbe?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "High-strength steel rebar for reinforced concrete",
          category: "Material",
        },
        {
          id: 5,
          name: "Crane Operator",
          price: 1200,
          image:
            "https://images.unsplash.com/photo-1509390726584-faaa21c8ac95?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Skilled crane operator for heavy lifting tasks",
          category: "Professionals",
        },
        {
          id: 6,
          name: "Concrete Mixer Small",
          price: 5000,
          image:
            "https://plus.unsplash.com/premium_photo-1661963687013-36b88a78062e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Efficient concrete mixer for small-scale projects",
          category: "Machine",
        },
        {
          id: 7,
          name: "Concrete Mixer Large",
          price: 60000,
          image:
            "https://plus.unsplash.com/premium_photo-1661913209349-eca68a68dee2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Efficient concrete mixer for large-scale projects",
          category: "Machine",
        },
        {
          id: 8,
          name: "Bricks",
          price: 500,
          image:
            "https://plus.unsplash.com/premium_photo-1675103339078-88b54e155e71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Durable bricks for building sturdy structures.",
          category: "Material",
        },
        {
          id: 9,
          name: "Gravel",
          price: 250,
          image:
            "https://plus.unsplash.com/premium_photo-1675543163354-e4dc1f541330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Assorted gravel for landscaping and construction projects.",
          category: "Material",
        },
        {
          id: 10,
          name: "Wooden Planks",
          price: 400,
          image:
            "https://images.unsplash.com/photo-1591195853095-f1681b00e29c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Assorted gravel for landscaping and construction projects.",
          category: "Material",
        },
        {
          id: 11,
          name: "Sand",
          price: 200,
          image:
            "https://plus.unsplash.com/premium_photo-1680658496041-f7575066cec2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Fine-grade sand for various construction applications.",
          category: "Material",
        },
        {
          id: 12,
          name: "Civil Engineer",
          price: 200000,
          image:
            "https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Every plane has to be Organised",
          category: "Professionals",
        },
        {
          id: 13,
          name: "Carpenter",
          price: 200000,
          image:
            "https://plus.unsplash.com/premium_photo-1677151140792-e1b681faffbb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Shape your Woods, just like your Life",
          category: "Professionals",
        },
        {
          id: 14,
          name: "Truck",
          price: 20000,
          image:
            "https://plus.unsplash.com/premium_photo-1661964199430-3e49c575b0b0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Efficient for large-scale Loads",
          category: "Machine",
        },
        {
          id: 15,
          name: "Pick-Up Truck",
          price: 5000,
          image:
            "https://images.unsplash.com/photo-1605504835488-e8c6d37beb43?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Efficient for small-scale Loads",
          category: "Machine",
        },
        {
          id: 16,
          name: "Frontend Loader",
          price: 115600,
          image:
            "https://images.unsplash.com/photo-1629807473015-41699c4471b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Efficient for small-scale Loads",
          category: "Machine",
        },
      ]
      setProducts(defaultProducts)
      localStorage.setItem("products", JSON.stringify(defaultProducts))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...editingProduct, ...newProduct } : p,
      )
      setProducts(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts))
      setEditingProduct(null)
    } else if (isAddingProduct) {
      const newProductWithId = { ...newProduct, id: Date.now() }
      const updatedProducts = [...products, newProductWithId]
      setProducts(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts))
      setIsAddingProduct(false)
    }
    setNewProduct({ name: "", price: 0, image: "", description: "", category: "Material" })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct(product)
  }

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  const renderProductsByCategory = (category: "Material" | "Machine" | "Professionals") => {
    const filteredProducts = products.filter((product) => product.category === category)

    return (
      <div key={category} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{category}</h2>
        <Button
          onClick={() => {
            setIsAddingProduct(true)
            setNewProduct((prev) => ({ ...prev, category }))
          }}
          className="mb-4"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New {category}
        </Button>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-4 rounded-md"
                  />
                  <p className="text-lg font-bold text-card-foreground">₹{product.price}</p>
                  <p className="text-sm text-card-foreground">{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleEditProduct(product)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl font-bold mb-6 text-foreground"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to CSkit Seller App, {user?.username}
        </motion.h1>
      </div>

      {renderProductsByCategory("Material")}
      {renderProductsByCategory("Machine")}
      {renderProductsByCategory("Professionals")}

      <Dialog
        open={!!editingProduct || isAddingProduct}
        onOpenChange={() => {
          setEditingProduct(null)
          setIsAddingProduct(false)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="productPrice">Price</Label>
              <Input
                id="productPrice"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="productImage">Product Image URL</Label>
              <Input
                id="productImage"
                type="url"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="productDescription">Description</Label>
              <Textarea
                id="productDescription"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="productCategory">Category</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) =>
                  setNewProduct({ ...newProduct, category: value as "Material" | "Machine" | "Professionals" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Material">Material</SelectItem>
                  <SelectItem value="Machine">Machine</SelectItem>
                  <SelectItem value="Professionals">Professionals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">{editingProduct ? "Update Product" : "Add Product"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

