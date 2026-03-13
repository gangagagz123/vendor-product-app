

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
import re

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
     # Validate username
    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already registered")

        return value


    # Validate password security
    def validate_password(self, value):

        if len(value) < 6:
            raise serializers.ValidationError(
                "Password must be at least 6 characters long"
            )

        # must contain letter and number
        if not re.search(r"[A-Za-z]", value) or not re.search(r"[0-9]", value):
            raise serializers.ValidationError(
                "Password must contain both letters and numbers"
            )

        return value


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# Serializer converts Product model data → JSON
# and JSON → Product model data
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product

        # These fields will be included in API responses
        fields = [
            'id',
            'name',
            'description',
            'price',
            'quantity',
            'created_date'
        ]

        # created_date should not be manually entered
        read_only_fields = ['created_date']


    # Prevent duplicate products for the same vendor
    def validate(self, data):

        request = self.context.get("request")
        vendor = request.user
        name = data.get("name")

        # Check if this vendor already has this product
        if Product.objects.filter(vendor=vendor, name=name).exists():
            raise serializers.ValidationError(
                "This product already exists. You can edit or update it."
            )

        return data