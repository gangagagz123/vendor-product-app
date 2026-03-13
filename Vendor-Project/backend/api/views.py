from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
from rest_framework import generics
from .serializers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


# ProductViewSet handles all CRUD operations
class ProductViewSet(viewsets.ModelViewSet):

     # This helps the router identify the model
    queryset = Product.objects.all()

     # Serializer used for converting data
    serializer_class = ProductSerializer

    # Only logged-in users can access these APIs
    permission_classes = [IsAuthenticated]

    # This function controls which products are visible
    def get_queryset(self):
        # request.user → currently logged-in vendor
        # So vendor can see only their own products
        return Product.objects.filter(vendor=self.request.user)

    # This function runs when a new product is created
    def perform_create(self, serializer):
        # Automatically assign product to logged-in vendor
        serializer.save(vendor=self.request.user)