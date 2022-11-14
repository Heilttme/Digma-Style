from django.urls import path
from .views import ItemView, OneItemView

urlpatterns = [
    path("items/", ItemView.as_view()),
    path("items/<int:pk>", OneItemView.as_view())
]
