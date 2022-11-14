from django.urls import path
from .views import SignUpView, LogInView, token_response, add_to_cart, get_cart_items, set_cart_quantity_item, delete_cart_item, add_to_favorited, get_favorited, set_favorited, set_cart_size

urlpatterns = [
    path("signup/", SignUpView.as_view()),
    path("login/", LogInView.as_view()),
    path("token/", token_response),
    path("get_cart/", get_cart_items),
    path("set_cart/", add_to_cart),
    path("set_quantity/", set_cart_quantity_item),
    path("delete_item/", delete_cart_item),
    path("add_to_favorited/", add_to_favorited),
    path("get_favorited/", get_favorited),
    path("set_favorited/", set_favorited),
    path("set_cart_size/", set_cart_size),
]
