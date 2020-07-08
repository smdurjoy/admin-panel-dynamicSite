<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminLoginModel extends Model
{
    protected $table = 'admin_login';
    protected $primarykey = 'id';
    public $incrementing = true;
    protected $keytype = 'int';
    public $timestamps = false;
}