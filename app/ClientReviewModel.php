<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientReviewModel extends Model
{
    protected $table = 'client_review';
    protected $primarykey = 'id';
    public $incrementing = true;
    protected $keytype = 'int';
    public $timestamps = false;
}
