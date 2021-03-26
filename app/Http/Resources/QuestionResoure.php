<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResoure extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
          'id'=>$this->id,
          'user_id'=>$this->user_id,
          'title'=>$this->title,
          'slug'=>$this->slug,
          'body'=>$this->body,
          'user'=>$this->user->name,
          'path'=>$this->path,
          'created_at'=>$this->created_at->diffForHumans(),
        ];
    }
}
