from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer
from rest_framework.decorators import api_view
from authentication.models import ShopUser

class ItemView(APIView):
    def get(self, request):
        items = Item.objects.all()
        return Response({"items": ItemSerializer(items, many=True).data})
    
    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"post": serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if not pk:
            return Response({"error": "method DELETE is not allowed"})
        
        try:
            instance = Item.objects.filter(pk=pk)
        except:
            return Response({"error": "object does not exists"})
        
        instance.delete()

        return Response({"delete": "success"})


class OneItemView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if not pk:
            return Response({"error": "method GET is not allowed"})
        
        try:
            instance = Item.objects.filter(pk=pk)[0]
        except:
            return Response({"error": "object does not exists"})

        serializer = ItemSerializer(instance)

        print(serializer.data)

        return Response({"get": serializer.data})


class CartView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.email
        pk = request.data.item.id
        brand = request.data.item.brand
        name = request.data.item.name
        pictures = request.data.item.pictures
        price = request.data.item.price

        user = ShopUser.objects.filter(email=request.data.email)

        cart = user.cart 
        user.cart = cart + {"id": id, "brand": brand, "name": name, "pictures": pictures, "price": price}
        user.save()

        return Response({"post": "successfully added to cart", "message": "success"})