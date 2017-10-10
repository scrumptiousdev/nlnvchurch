@extends('layouts.master')

@section('content')
  <div class="col-sm-8 blog-main">

    <h1>{{ $post->title }}</h1>

    @if(count($post->tags))
      <div class="clearfix">
        @foreach($post->tags as $tag)
          <a class="badge badge-secondary" href="/posts/tags/{{ $tag->name }}">
            {{ $tag->name }}
          </a>
        @endforeach
      </div>
    @endif

    {{ $post->body }}

    <hr>
    <div class="comments">
      <ul class="list-group">
        @foreach($post->comments as $comment)
          <li class="list-group-item">
            <strong>
              {{ $comment->created_at->diffForHumans() }}: &nbsp;
            </strong>
            {{ $comment->body }}
          </li>
        @endforeach
      </ul>
    </div>

    {{-- Add a comment --}}
    <hr>
    <div class="card">
      <div class="card-body">
        <form action="/posts/{{ $post->id }}/comments" method="POST">
          {{ csrf_field() }}
          <div class="form-group">
            <textarea class="form-control" name="body" placeholder="Your comment here."></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Add Comment</button>
          </div>
        </form>
        @include('layouts.errors')
      </div>
    </div>

  </div>
@endsection
