<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HomeEtcModel extends Model
{
    protected $table = 'home_etc';
    protected $primarykey = 'id';
    public $incrementing = true;
    protected $keytype = 'int';
    public $timestamps = false;
}
