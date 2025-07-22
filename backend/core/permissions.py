from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsSchoolStaff(BasePermission):
    allowed_types = ['admin', 'director', 'coordinator', 'secretary']

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type in self.allowed_types


class IsStudentSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and obj.user == request.user


class IsTeacherOfStudent(BasePermission):
    def has_object_permission(self, request, view, obj):
        teacher = request.user
        return teacher.is_authenticated and teacher.user_type == 'teacher' and obj.classroom and obj.classroom.teacher_responsible == teacher


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
