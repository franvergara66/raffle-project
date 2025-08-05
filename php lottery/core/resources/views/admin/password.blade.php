@extends('admin.layouts.app')

@section('panel')
    <div class="row mb-none-30">
        <div class="col-lg-3 col-md-3 mb-30">

            <div class="card b-radius--5 overflow-hidden">
                <div class="card-body p-0">
                    <div class="d-flex p-3 bg--primary">
                        <div class="avatar avatar--lg">
                            <img src="{{ getImage(imagePath()['profile']['admin']['path'].'/'. $admin->image,imagePath()['profile']['admin']['size'])}}" alt="@lang('Image')">
                        </div>
                        <div class="pl-3">
                            <h4 class="text--white">{{__($admin->name)}}</h4>
                        </div>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            @lang('Name')
                            <span class="font-weight-bold">{{ __($admin->name) }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            @lang('Username')
                            <span  class="font-weight-bold">{{ __($admin->username) }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            @lang('Email')
                            <span  class="font-weight-bold">{{ $admin->email }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-lg-9 col-md-9 mb-30">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title mb-4 border-bottom pb-2">@lang('Change Password')</h5>

                    <form action="{{ route('admin.password.update') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label for="old_password" class="required">@lang('Password')</label>
                            <input class="form-control" type="password" placeholder="@lang('Password')" name="old_password" id="old_password" required>
                        </div>

                        <div class="form-group">
                            <label for="password" class="required">@lang('New Password')</label>
                            <input class="form-control" type="password" placeholder="@lang('New Password')" name="password" id="password" required>
                        </div>

                        <div class="form-group">
                            <label for="password_confirmation" class="required">@lang('Confirm Password')</label>
                            <input class="form-control" type="password" placeholder="@lang('Confirm Password')" name="password_confirmation" id="password_confirmation" required>
                        </div>

                        <button type="submit" class="btn btn--primary w-100 btn-lg h-45">@lang('Submit')</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('breadcrumb-plugins')
    <a href="{{route('admin.profile')}}" class="btn btn-sm btn--primary box--shadow1 text--small" ><i class="fa fa-user"></i>@lang('Profile Setting')</a>
@endpush
