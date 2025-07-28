@extends('admin.layouts.app')

@section('panel')
<div class="row justify-content-center">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body p-0">
                <div class="table-responsive--sm table-responsive">
                    <table class="table table--light style--two">
                        <thead>
                            <tr>
                                <th>@lang('S.N.')</th>
                                <th>@lang('Image')</th>
                                <th>@lang('Lottery Name')</th>
                                <th>@lang('Price')</th>
                                <th>@lang('Total Phase')</th>
                                <th>@lang('Total Draw')</th>
                                <th>@lang('Status')</th>
                                <th>@lang('Action')</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                            @forelse($lotteries as $lottery)
                            <tr>
                                <td data-label="@lang('S.N.')">{{ $loop->iteration }}</td>
                                <td data-label="@lang('Image')">
                                    <div class="customer-details d-block">
                                        <a class="thumb" href="javascript:void(0)">
                                            <img src="{{ getImage('assets/images/lottery/' . $lottery->image, imagePath()['lottery']['size']) }}" alt="image">
                                        </a>
                                    </div>
                                </td>
                                <td data-label="@lang('Lottery Name')">{{ $lottery->name }}</td>
                                <td data-label="@lang('Price')">{{ getAmount($lottery->price) }} {{ $general->cur_text }}</td>
                                <td data-label="@lang('Total Phase')">{{ $lottery->phase->count() }}</td>
                                <td data-label="@lang('Total Draw')">{{ $lottery->phase->where('draw_status',1)->count() }}</td>
                                <td data-label="@lang('Status')">
                                    @if($lottery->status == 1)
                                        <span class="badge badge--success">@lang('Active')</span>
                                    @else
                                        <span class="badge badge--danger">@lang('Inactive')</span>
                                    @endif
                                </td>
                                <td data-label="@lang('Action')">
                                    <div class="button--group">
                                        <a class="btn btn-sm btn-outline--primary editBtn" href="{{ route('admin.lottery.edit',$lottery->id) }}">
                                            <i class="la la-pen"></i> @lang('Edit')
                                        </a>
                                        @if($lottery->status == 1)
                                            <a class="btn btn-sm btn-outline--danger" href="{{ route('admin.lottery.status',$lottery->id) }}">
                                                <i class="la la-eye-slash"></i> @lang('Inactive')
                                            </a>
                                        @else
                                            <a class="btn btn-sm btn-outline--success" href="{{ route('admin.lottery.status',$lottery->id) }}">
                                                <i class="la la-eye"></i> @lang('Active')
                                            </a>
                                        @endif
                                        <button class="btn btn-sm btn-outline--info dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-expanded="false">
                                            <i class="la la-ellipsis-v"></i> @lang('More')
                                        </button>
                                        <div class="dropdown-menu">
                                            <li>
                                                <a class="dropdown-item editBtn text--info" href="{{ route('admin.lottery.winBonus',$lottery->id) }}">
                                                    <i class="las la-trophy"></i> @lang('Set Win Bonus')
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item editBtn text--warning" href="{{ route('admin.lottery.phase.singleLottery',$lottery->id) }}">
                                                    <i class="fas fa-layer-group"></i> @lang('Ticket phases')
                                                </a>
                                            </li>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td class="text-muted text-center" colspan="100%">@lang('Ticket Not Found')</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer py-4">
                {{ $lotteries->links('admin.partials.paginate') }}
            </div>
        </div>
    </div>
</div>
@endsection
@push('breadcrumb-plugins')
<form method="GET" class="d-flex flex-wrap gap-2">
    <div class="input-group w-auto flex-fill">
        <input type="search" name="search" class="form-control bg--white" placeholder="@lang('Search lottery')" value="{{ $search ?? '' }}">
        <button class="btn btn--primary" type="submit"><i class="la la-search"></i></button>
    </div>
</form>
<a class="btn btn-sm btn-outline--primary" href="{{ route('admin.lottery.create') }}"><i class="la la-plus"></i>@lang('Add New')</a>
@endpush