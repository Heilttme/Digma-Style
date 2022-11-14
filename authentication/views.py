from django.shortcuts import render
from rest_framework.views import APIView 
from .models import ShopUser
from .serializers import UserSerializer
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def token_response(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    
    if not user:
        return Response({"error": "User does not exists", "message": "error"})

    user = list(user)[0]

    response = Response({"message": "Set TOKEN"})
    response.set_cookie("TOKEN", user.access_token, secure=True, httponly=True)
    return response

@api_view(['POST'])
def add_to_cart(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]
    print(request.data.get('size'))

    cart = user.cart
    id = request.data.get('id')
    size = request.data.get('size')
    cart.update({f"{id}-{size}": {"quantity": request.data.get("quantity"), "size": request.data.get("size")}})

    user.cart = cart
    user.save()
    return Response({"post": "cart updated successfully"})


@api_view(['POST'])
def get_cart_items(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]

    return Response({"cart": user.cart})


@api_view(["POST"])
def set_cart_quantity_item(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]
    cart = user.cart.copy()
    id = str(request.data.get("id"))
    size = str(request.data.get("size"))
    cart[f"{id}-{size}"]["quantity"] = request.data.get("quantity")
    user.cart = cart

    user.save()
    return Response({"cart": "changed successfully"})

@api_view(["POST"])
def set_cart_size(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]
    cart = user.cart.copy()
    id = str(request.data.get("id"))
    cur_size = str(request.data.get("curSize"))
    size_to_set = str(request.data.get("sizeToSet"))
    cart[f"{id}-{cur_size}"]["size"] = size_to_set
    cart[f"{id}-{size_to_set}"] = cart.pop(f"{id}-{cur_size}")
    user.cart = cart

    user.save()
    return Response({"cart": "changed successfully"})

@api_view(["POST"])
def delete_cart_item(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]
    cart = user.cart.copy()
    id = str(request.data.get("id"))
    size = str(request.data.get("size"))
    cart.pop(f"{id}-{size}")

    user.cart = cart
    user.save()

    return Response({"cart": "deleted successfully"})    


@api_view(["POST"])
def add_to_favorited(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]
    
    favorited = user.favorited.copy()
    favorited[str(request.data.get("id"))] = str(request.data.get("id"))
    user.favorited = favorited

    user.save()

    return Response({"favorited": "added successfully"})


@api_view(["POST"])
def get_favorited(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]

    favorited = user.favorited

    return Response({"favorited": favorited})

@api_view(["POST"])
def set_favorited(request):
    user = ShopUser.objects.filter(email=request.data.get("email"))
    user = list(user)[0]

    user.favorited = request.data.get("favorited")
    user.save()

    return Response({"favorited": "set successfully"})

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        if request.COOKIES.get("TOKEN"):
            if request.data.get("login") == "logout":
                response = Response({"success": "cookie deleted", "message": "success"})
                response.delete_cookie("TOKEN")
                return response

            user = ShopUser.objects.filter(access_token=request.COOKIES.get("TOKEN"))
            if user:
                # return Response({"error": "User does not exists", "message": "error"})

                user = list(user)[0]

                return Response({"post": {"username": user.username, "email": user.email}, "message": "success"})
        
        user = ShopUser.objects.filter(email=request.data.get("email"))
        if user:
            return Response({"error": "User already exists", "message": "error"})
            print({"error": "User already exists", "message": "error"})
        
        password = make_password(request.data.get("password"))
        email = request.data.get("email")
        username = request.data.get("username")


        serializer = UserSerializer(data={"username": username, "email": email, "password": password})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = list(ShopUser.objects.filter(email=serializer.data["email"]))[0]
        token = get_tokens_for_user(user)
        
        user.refresh_token = token["refresh"]
        user.access_token = token["access"]

        if request.data.get("newCart"):
            user.cart = request.data.get("newCart")
            
        user.save()

        return Response({"post": {"username": user.username, "email": user.email, "refresh": user.refresh_token, "access": user.access_token}, "message": "success"})


class LogInView(APIView):
    def post(self, request, *args, **kwargs):
        if request.COOKIES.get("TOKEN"):
            if request.data.get("login") == "logout":
                response = Response({"success": "cookie deleted", "message": "success"})
                response.delete_cookie("TOKEN")
                return response

            user = ShopUser.objects.filter(access_token=request.COOKIES.get("TOKEN"))
            if not user:
                return Response({"error": "User does not exists", "message": "error"})

            user = list(user)[0]

            return Response({"post": {"username": user.username, "email": user.email}, "message": "success"})

        user = ShopUser.objects.filter(email=request.data.get("email"))
        if not user:
            return Response({"error": "User does not exists", "message": "error"})
        
        user = list(user)[0]

        if check_password(request.data.get("password"), user.password):
            return Response({"post": {"username": user.username, "email": user.email}, "message": "success"})


        return Response({"error": "Unknown error occured", "message": "error"})